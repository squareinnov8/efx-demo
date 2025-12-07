import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  onFilesSelected?: (files: File[]) => void
  variant?: 'default' | 'compact' | 'avatar'
  disabled?: boolean
  className?: string
}

const UploadIcon = () => (
  <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const FileIcon = () => (
  <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10, // 10MB default
  onFilesSelected,
  variant = 'default',
  disabled = false,
  className = '',
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateFiles = (fileList: File[]): File[] => {
    const maxBytes = maxSize * 1024 * 1024
    const validFiles: File[] = []

    for (const file of fileList) {
      if (file.size > maxBytes) {
        setError(`File "${file.name}" exceeds ${maxSize}MB limit`)
        continue
      }
      validFiles.push(file)
    }

    return validFiles
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = validateFiles(droppedFiles)

    if (validFiles.length > 0) {
      setError(null)
      const newFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1)
      setFiles(newFiles)
      onFilesSelected?.(newFiles)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || disabled) return

    const selectedFiles = Array.from(e.target.files)
    const validFiles = validateFiles(selectedFiles)

    if (validFiles.length > 0) {
      setError(null)
      const newFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1)
      setFiles(newFiles)
      onFilesSelected?.(newFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected?.(newFiles)
  }

  const openFilePicker = () => {
    if (!disabled) inputRef.current?.click()
  }

  if (variant === 'compact') {
    return (
      <div className={className}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={openFilePicker}
          disabled={disabled}
          className={`
            inline-flex items-center gap-2 px-4 py-2
            border border-neutral-300 rounded-lg
            text-sm font-medium text-neutral-700
            hover:bg-neutral-50 transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload file
        </button>
        {files.length > 0 && (
          <div className="mt-2 text-sm text-neutral-600">
            {files.length} file(s) selected
          </div>
        )}
      </div>
    )
  }

  if (variant === 'avatar') {
    return (
      <div className={className}>
        <input
          ref={inputRef}
          type="file"
          accept={accept || 'image/*'}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
        <button
          type="button"
          onClick={openFilePicker}
          disabled={disabled}
          className={`
            relative w-24 h-24 rounded-full
            bg-neutral-100 border-2 border-dashed border-neutral-300
            flex items-center justify-center
            hover:border-primary-500 transition-colors
            group
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {files[0] ? (
            <img
              src={URL.createObjectURL(files[0])}
              alt="Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <svg className="w-8 h-8 text-neutral-400 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )}
        </button>
        <p className="mt-2 text-sm text-neutral-500">Upload photo</p>
      </div>
    )
  }

  // Default variant
  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFilePicker}
        className={`
          relative flex flex-col items-center justify-center
          px-6 py-10
          border-2 border-dashed rounded-xl
          transition-colors
          ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-neutral-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : 'cursor-pointer hover:border-primary-500'}
        `}
      >
        <UploadIcon />
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600">
            <span className="font-semibold text-primary-600">Click to upload</span>
            {' '}or drag and drop
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            {accept ? accept.replace(/,/g, ', ') : 'Any file type'} up to {maxSize}MB
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-error-600">{error}</p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileIcon />
                <div>
                  <p className="text-sm font-medium text-neutral-900">{file.name}</p>
                  <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="p-1 text-neutral-400 hover:text-error-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

FileUpload.displayName = 'FileUpload'
