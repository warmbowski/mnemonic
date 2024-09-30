import { useEffect, useRef, useState } from "react"

interface PixelifyProps {
  src: string
  className?: string
  pixelSize?: number
  width?: number
  height?: number
  centered?: boolean
  fillTransparencyColor?: string
}

/**
 * Component based on react-pixelify: https://github.com/nikoferro/react-pixelify
 */
export const Pixelify = ({
  src,
  className,
  width,
  height,
  pixelSize = 1,
  centered = false,
  fillTransparencyColor = "transparent",
}: PixelifyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    setProcessing(true)

    const paintPixels = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      pixelSize: number,
      centered: boolean,
      fillTransparencyColor: string
    ) => {
      if (!isNaN(pixelSize) && pixelSize > 0) {
        for (let x = 0; x < img.width + pixelSize; x += pixelSize) {
          for (let y = 0; y < img.height + pixelSize; y += pixelSize) {
            let xColorPick = x
            let yColorPick = y

            if (x >= img.width) {
              xColorPick = x - (pixelSize - (img.width % pixelSize) / 2) + 1
            }
            if (y >= img.height) {
              yColorPick = y - (pixelSize - (img.height % pixelSize) / 2) + 1
            }

            const rgba = ctx.getImageData(xColorPick, yColorPick, 1, 1).data
            ctx.fillStyle =
              rgba[3] === 0
                ? fillTransparencyColor
                : `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`

            if (centered) {
              ctx.fillRect(
                x - (pixelSize - (img.width % pixelSize) / 2),
                y - (pixelSize - (img.height % pixelSize) / 2),
                pixelSize,
                pixelSize
              )
            } else {
              ctx.fillRect(x, y, pixelSize, pixelSize)
            }
          }
        }
      }
    }

    // create img that will be later painted into the canvas
    let img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    // once image is loaded..
    img.onload = () => {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        img.width = width ? width : img.width
        img.height = height ? height : img.height
        canvas.width = img.width
        canvas.height = img.height
        // we paint the image into the canvas
        // this is needed to get RGBA info out of each pixel
        if (ctx) {
          ctx.drawImage(img, 0, 0, img.width, img.height)
          paintPixels(ctx, img, pixelSize, centered, fillTransparencyColor)
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        img = null
      }
    }

    setProcessing(false)
  }, [centered, fillTransparencyColor, height, pixelSize, src, width])

  return processing ? (
    <img className={className} src={src} />
  ) : (
    <canvas className={className} ref={canvasRef} />
  )
}

export const Pixelify2 = ({
  src,
  className,
  width,
  height,
  pixelSize = 1,
  centered = false,
  fillTransparencyColor = "transparent",
}: PixelifyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const pixelateImage = (
      idata: ImageData,
      blockSize: number,
      w: number,
      h: number
    ) => {
      const data = idata.data

      const wmax = ((w / blockSize) | 0) * blockSize
      const wrest = w - wmax

      const hmax = ((h / blockSize) | 0) * blockSize
      const hrest = h - hmax

      let hh = blockSize

      for (let y = 0; y < h; y += blockSize) {
        let ww = blockSize
        if (y == hmax) hh = hrest

        for (let x = 0; x < w; x += blockSize) {
          const n = 4 * (w * y + x)
          const r = data[n]
          const g = data[n + 1]
          const b = data[n + 2]
          const a = data[n + 3]

          if (x == wmax) ww = wrest

          for (let j = 0; j < hh; j++) {
            let m = n + 4 * (w * j)

            for (let i = 0; i < ww; i++) {
              data[m++] = r
              data[m++] = g
              data[m++] = b
              data[m++] = a
            }
          }
        }
      }
      return idata
    }

    // create img that will be later painted into the canvas
    let img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    // once image is loaded..
    img.onload = () => {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        img.width = width ? width : img.width
        img.height = height ? height : img.height
        canvas.width = img.width
        canvas.height = img.height
        // we paint the image into the canvas
        // this is needed to get RGBA info out of each pixel
        if (ctx) {
          ctx.drawImage(img, 0, 0, img.width, img.height)
          const origImageData = ctx.getImageData(0, 0, img.width, img.height)
          const newImageData = pixelateImage(
            origImageData,
            pixelSize,
            img.width,
            img.height
          )
          ctx.putImageData(newImageData, 0, 0)
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        img = null
      }
    }
  }, [centered, fillTransparencyColor, height, pixelSize, src, width])

  return <canvas className={className} ref={canvasRef} />
}
