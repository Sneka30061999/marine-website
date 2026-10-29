/**
 * useMeta — sets document <title> and <meta name="description">
 * per page without adding an external dependency.
 *
 * Usage:
 *   useMeta({ title: 'Page title', description: 'Page description' })
 */
import { useEffect } from 'react'

export default function useMeta({ title, description, canonical }) {
  useEffect(() => {
    // Title
    if (title) document.title = title

    // Description
    let desc = document.querySelector('meta[name="description"]')
    if (!desc) {
      desc = document.createElement('meta')
      desc.setAttribute('name', 'description')
      document.head.appendChild(desc)
    }
    if (description) desc.setAttribute('content', description)

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', canonical)
    }
  }, [title, description, canonical])
}
