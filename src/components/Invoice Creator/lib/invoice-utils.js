import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export const calculateItemAmount = (item) => {
  const baseAmount = item.unitPrice * item.quantity
  const discountAmount = item.discount ? baseAmount * (item.discount / 100) : 0
  return baseAmount - discountAmount
}

export const calculateSubTotal = (items) => {
  return items.reduce((total, item) => total + item.amount, 0)
}

export const calculateTaxAmount = (items, taxes) => {
  let totalTax = 0

  items.forEach((item) => {
    if (item.tax) {
      const tax = taxes?.find((t) => t.name === item.tax)
      if (tax) {
        totalTax += item.amount * (tax.percentage / 100)
      }
    }
  })

  return totalTax
}

export const calculateTotal = (items, taxes) => {
  return calculateSubTotal(items) + calculateTaxAmount(items, taxes)
}

export const updateItemAmount = (item) => {
  return {
    ...item,
    amount: calculateItemAmount(item),
  }
}

export const generateUniqueId = () => {
  // Generate a random string of 3 uppercase letters
  const letters = Array(3)
    .fill(0)
    .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    .join("")

  // Generate a random string of 6 numbers
  const numbers = Array(6)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("")

  return `${letters}${numbers}`
}

export const generateInvoiceNumber = () => {
  // Generate a random 4-digit number
  const number = Math.floor(1000 + Math.random() * 9000)
  return `INV-${number}`
}

export const generatePDF = async (element) => {
  // Create a clone of the element to avoid modifying the original
  const clone = element.cloneNode(true)
  document.body.appendChild(clone)

  // Apply styles for better PDF rendering
  clone.style.width = "794px" // A4 width in pixels at 96 DPI
  clone.style.padding = "40px"
  clone.style.backgroundColor = "white"
  clone.style.position = "absolute"
  clone.style.left = "-9999px"
  clone.style.top = 0

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: "#ffffff",
      height: clone.offsetHeight, // Only capture the actual content height
    })

    const imgData = canvas.toDataURL("image/jpeg", 1.0)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, (imgHeight * pdfWidth) / imgWidth)

    return pdf
  } finally {
    // Clean up
    if (clone && clone.parentNode) {
      clone.parentNode.removeChild(clone)
    }
  }
}

