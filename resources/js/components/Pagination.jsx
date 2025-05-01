import React from "react";

export default function Pagination({ info, active, setActive }) {
    const pagination = Array.from({ length: info.last_page }, (_, i) => i + 1);
    return (
        <div className="pagination">
            {active > 2 ? (
                <p
                    onClick={() => {
                        setActive(active > 0 ? active - 1 : info.last_page - 1);
                    }}
                >
                    {"<"}
                </p>
            ) : (
                ""
            )}
            {info.last_page > 4 && active > 1 ? (
                <>
                    <p
                        onClick={() => {
                            setActive(0);
                        }}
                    >
                        1
                    </p>
                    {active > 2 ? <p>...</p> : ""}
                </>
            ) : (
                ""
            )}
            {pagination.map((text, i) => (
                <>
                    {info.last_page < 5 ||
                    active == i ||
                    active == i + 1 ||
                    active == i - 1 ||
                    (active == 0 && i == 2) ||
                    (active == info.last_page - 1 && i == info.last_page - 3) ? (
                        <p
                            key={"forums-pagination-" + i}
                            className={active == i ? "active" : ""}
                            onClick={() => {
                                setActive(i);
                            }}
                        >
                            {text}
                        </p>
                    ) : (
                        ""
                    )}
                </>
            ))}
            {info.last_page > 4 && info.last_page - active > 2 ? (
                <>
                    {active < info.last_page - 3 ? <p>...</p> : ""}
                    <p
                        onClick={() => {
                            setActive(info.last_page - 1);
                        }}
                    >
                        {info.last_page}
                    </p>
                </>
            ) : (
                ""
            )}
            {active < info.last_page - 3 ? (
                <p
                    onClick={() => {
                        setActive(active < info.last_page - 1 ? active + 1 : 0);
                    }}
                >
                    {">"}
                </p>
            ) : (
                ""
            )}
        </div>
    );
}
