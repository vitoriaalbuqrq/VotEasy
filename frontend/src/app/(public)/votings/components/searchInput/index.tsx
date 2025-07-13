type SearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({value, onChange}: SearchInputProps) {
  return (
    <form className="min-w-[50%] ms-auto">
      <label htmlFor="default-search" className="mb-2 text-base font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <input 
        type="search" 
        id="default-search" 
        className="block w-full rounded-full p-2 pe-10 text-base text-gray-900 bg-gray-50 border border-gray-300 focus:ring-1 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
        placeholder="Pesquisar nome da votação" required 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" aria-hidden="true">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
      </div>
    </form>

  )
}