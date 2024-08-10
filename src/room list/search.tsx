import { useState } from "react"
import { Button } from "react-bootstrap"

export default function Search({ onSearch }: { onSearch: (search: string) => void }) {
    const [search, setSearch] = useState<string>('')
    return <>
        <div className="search-box">
            <input type="text" name="search" value={search} onChange={(event) => setSearch(event.target.value)} />
            <Button  onClick={() => onSearch(search)}>Search</Button>
        </div>
    </>
}