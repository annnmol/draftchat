// ====== URL QUERY PARAMS
interface UrlQueryParams {
  params: string
  key: string
  value: string | null
}

interface RemoveUrlQueryParams {
  params: string
  keysToRemove: string[]
}

interface SearchParamProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface IData {
  [key: string]: any;
}
