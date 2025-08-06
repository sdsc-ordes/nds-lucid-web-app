/**
 * Smooth scroll to an element by ID with optional offset
 * @param targetId - The ID of the element to scroll to (without the #)
 * @param offset - Optional offset in pixels (default: -80 for header height)
 */
export function smoothScrollTo(targetId: string, offset: number = -80): void {
    const element = document.getElementById(targetId);
    
    if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    }
}

/**
 * Handle navigation click with smooth scrolling
 * @param event - The click event
 * @param href - The href attribute (e.g., "#section-id")
 * @param offset - Optional offset in pixels (default: -80 for header height)
 */
export function handleNavClick(event: Event, href: string, offset: number = -80): void {
    event.preventDefault();
    
    const targetId = href;
    smoothScrollTo(targetId, offset);
} 