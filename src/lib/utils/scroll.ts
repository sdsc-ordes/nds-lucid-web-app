/**
 * Get the current header height
 * @returns The height of the header in pixels
 */
export function getHeaderHeight(): number {
    return document.querySelector(".navbar-wrapper")?.clientHeight || 0;
}

/**
 * Smooth scroll to an element by ID with dynamic header offset
 * @param targetId - The ID of the element to scroll to (without the #)
 * @param additionalOffset - Optional additional offset in pixels
 */
export function smoothScrollTo(
    targetId: string,
    additionalOffset: number = 10,
): void {
    const element = document.getElementById(targetId);

    if (element) {
        const headerHeight = getHeaderHeight();
        const offset = -(headerHeight + additionalOffset);
        const y =
            element.getBoundingClientRect().top + window.pageYOffset + offset;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    }
}

/**
 * Handle navigation click with smooth scrolling
 * @param event - The click event
 * @param href - The href attribute (without the #)
 * @param additionalOffset - Optional additional offset in pixels
 */
export function handleNavClick(
    event: Event,
    href: string,
    additionalOffset: number = 10,
): void {
    event.preventDefault();
    smoothScrollTo(href, additionalOffset);
}
