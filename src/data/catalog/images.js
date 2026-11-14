import data from './images.json'

export const catalogImages = data

export function allisonFamilyImages(slug) {
  return data.allisonFamilies[slug] ?? null
}

export function fptCategoryImages(slug) {
  return data.fptCategories[slug] ?? null
}

export function danaApplicationImages(slug) {
  return data.danaApplications[slug] ?? null
}

export function supportImages(key) {
  return data.support[key] ?? null
}

/** Match an FPT engine model name to a gallery photo when the filename contains the model. */
export function matchEngineImage(model, gallery = []) {
  if (!model || !gallery.length) return null
  const needle = String(model)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '')
  if (needle.length < 2) return null
  const scored = gallery
    .map((src) => {
      const name = src.split('/').pop().toUpperCase().replace(/[^A-Z0-9]+/g, '')
      let score = 0
      if (name.includes(needle)) score = needle.length + 10
      else if (needle.includes(name) && name.length >= 4) score = name.length
      return { src, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored[0]?.src ?? null
}

/** Human label from a catalog filename when it is descriptive enough to show. */
export function labelFromImagePath(src) {
  if (!src) return null
  const stem = src
    .split('/')
    .pop()
    .replace(/\.(webp|png|jpe?g)$/i, '')
    .replace(/_11zon$/i, '')
    .replace(/[-_]+/g, ' ')
    .trim()
  if (!stem) return null
  const compact = stem.replace(/\s+/g, '')
  if (/maxresdefault/i.test(stem)) return null
  if (/^(ag|spy|spray|spry|en|tr|pa|im)\d+$/i.test(compact)) return null
  if (compact.length < 4) return null
  return stem
    .split(/\s+/)
    .map((word) => {
      if (/^[0-9]+(st|nd|rd|th)?$/i.test(word)) return word
      if (word.length <= 3 && word === word.toUpperCase()) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export function labeledGallery(images = [], alt = 'Product photo') {
  return images.map((src, index) => ({
    src,
    label: labelFromImagePath(src),
    alt: labelFromImagePath(src) || `${alt} ${index + 1}`,
  }))
}
