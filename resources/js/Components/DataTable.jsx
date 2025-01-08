export default function DataTable({ ...props }) {
    return (
        <div {...props}>
            <div className="search-wrapper">
                <div
                    className="btn btn-primary"
                    style={{ marginBottom: "20px" }}
                >
                    Create New
                </div>
                <label>
                    <input
                        type="search"
                        className="search-input"
                        placeholder="Search..."
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handlePageChange({ selected: 0 });
                        }}
                    />
                </label>
            </div>
            <table xs={1} md={4} className="g-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">id</th>
                        <th className="border px-4 py-2">description</th>
                        <th className="border px-4 py-2">importance</th>
                        <th className="border px-4 py-2">buttons</th>
                    </tr>
                </thead>
                <tbody>{displayBulletins}</tbody>
            </table>
            <div>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName={
                        "pt-8 flex justify-center gap-2 items-center"
                    }
                    pageLinkClassName={
                        "relative block border border-gray-800 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    previousLinkClassName={
                        "relative block border border-gray-800 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    nextLinkClassName={
                        "relative block border border-gray-800 rounded-lg bg-transparent px-3 py-1.5 text-sm text-surface transition duration-300 hover:bg-gray-400"
                    }
                    activeClassName={"bg-gray-800 rounded-lg text-white"}
                    disabledClassName={"pointer-events-none opacity-50"}
                />
            </div>
        </div>
    );
}
