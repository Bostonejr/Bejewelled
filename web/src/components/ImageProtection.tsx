'use client'

import {useEffect} from 'react'

/**
 * Deters casual copying of the practice's photography.
 *
 * **What this is honestly worth.** A browser cannot display an image without
 * downloading it first, so the file is already on the visitor's machine before
 * any of this runs. Devtools, the network panel, `view-source`, a headless
 * fetch of the same URL, or simply turning JavaScript off all still retrieve
 * it, and nothing client-side can change that. What this does stop is the
 * three routes a casual visitor actually takes — right-click → Save image as,
 * dragging the picture onto the desktop, and the long-press "Save Image" sheet
 * on iOS and Android. That is a lock on the front door, not a wall.
 *
 * Two deliberate limits:
 *
 *   · Only images are guarded. Suppressing the context menu across the whole
 *     page takes Back, Open link in new tab, Copy and Reload with it, which
 *     punishes every visitor to inconvenience a copier for about four seconds.
 *   · No devtools traps — no F12 or Ctrl+Shift+I interception, no debugger
 *     loop, no console poisoning. They are bypassed by a menu click, they
 *     break legitimate use, and they are the sort of thing that reads as
 *     hostile in a browser extension audit.
 *
 * The listeners are delegated at the document and capture-phase, so they cover
 * every image on every route — including ones inside the lightbox, which mounts
 * and unmounts — without each component having to opt in.
 */
export function ImageProtection() {
  useEffect(() => {
    const isProtectedImage = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false
      // The plates put the <img> inside a <button>, and the browser reports
      // whichever element the pointer actually hit — so check the ancestor
      // chain too, not just the immediate target.
      return Boolean(target.closest('img, picture, [data-protected-image]'))
    }

    const onContextMenu = (event: MouseEvent) => {
      if (isProtectedImage(event.target)) event.preventDefault()
    }

    const onDragStart = (event: DragEvent) => {
      if (isProtectedImage(event.target)) event.preventDefault()
    }

    document.addEventListener('contextmenu', onContextMenu, {capture: true})
    document.addEventListener('dragstart', onDragStart, {capture: true})

    return () => {
      document.removeEventListener('contextmenu', onContextMenu, {capture: true})
      document.removeEventListener('dragstart', onDragStart, {capture: true})
    }
  }, [])

  return null
}
