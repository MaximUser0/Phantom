import React from "react";

export default function Pagination() {
    const [active, setActive] = React.useState(0);
    const pagination = ["1", "2", "3", "...", "12", ">"];
    return (
        <div className="pagination">
            {pagination.map((text, i) => (
                <p
                    key={"forums-pagination-" + i}
                    className={active == i ? "active" : ""}
                    onClick={() => {
                        setActive(i);
                    }}
                >
                    {text}
                </p>
            ))}
        </div>
    );
}
