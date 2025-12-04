import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  total: number;
  current: number;
  onPageChange?: (page: number) => void;
}

function PaginationComponent({ total, current, onPageChange }: Props) {
  const handleChange = (page: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (page < 1 || page > total || page === current) return;
    onPageChange?.(page);
  };

  // Decide which page numbers to show, with ellipsis where appropriate.
  // Simple algorithm:
  // - Always show first and last page
  // - Show current, current +/-1
  // - If gap between shown pages > 1 show ellipsis
  const buildPages = () => {
    const pages: (number | "ellipsis")[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    if (left > 2) pages.push("ellipsis");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < total - 1) pages.push("ellipsis");

    pages.push(total);

    return pages;
  };

  const pages = buildPages();

  const prevDisabled = current <= 1;
  const nextDisabled = current >= total || total === 0;

  return (
    <div className="py-5">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e: any) => {
                e.preventDefault();
                if (prevDisabled) return;
                handleChange(current - 1, e);
              }}
              aria-disabled={prevDisabled}
              className={prevDisabled ? "opacity-50 pointer-events-none" : ""}
            />
          </PaginationItem>

          {pages.map((p, idx) =>
            p === "ellipsis" ? (
              <PaginationItem key={`e-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem
                key={p}
                aria-current={p === current ? "page" : undefined}
              >
                <PaginationLink
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleChange(p, e);
                  }}
                  className={
                    p === current
                      ? "font-semibold bg-primary hover:bg-primary text-white hover:text-white rounded-md px-2 py-1"
                      : "px-3 py-1"
                  }
                  aria-current={p === current ? "page" : undefined}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e: any) => {
                e.preventDefault();
                if (nextDisabled) return;
                handleChange(current + 1, e);
              }}
              aria-disabled={nextDisabled}
              className={nextDisabled ? "opacity-50 pointer-events-none" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
