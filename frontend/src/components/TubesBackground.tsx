import { useEffect, useRef } from 'react'
// @ts-ignore
import TubesCursor from 'threejs-components/build/cursors/tubes1.min.js'

export const TubesBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const app = TubesCursor(canvasRef.current, {
            tubes: {
                colors: ["#f967fb", "#53bc28"],
                lights: {
                    intensity: 200,
                    colors: ["#83f36e", "#fe8a2e"]
                }
            }
        })

        const randomColors = (count: number) => {
            return new Array(count)
                .fill(0)
                .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'))
        }

        const handleClick = () => {
            const colors = randomColors(3)
            const lightsColors = randomColors(4)
            app.tubes.setColors(colors)
            app.tubes.setLightsColors(lightsColors)
        }

        window.addEventListener('click', handleClick)
        window.addEventListener('resize', () => app.resize?.())

        let idleTimeout: ReturnType<typeof setTimeout>
        let animFrame: number
        let t = 0

        const startIdleAnim = () => {
            const loop = () => {
                t += 0.05
                const w = window.innerWidth
                const h = window.innerHeight
                
                const x = w / 2 + (w * 0.3) * Math.cos(t)
                const y = h / 2 + (h * 0.3) * Math.sin(2 * t) / 2

                window.dispatchEvent(new MouseEvent('mousemove', {
                    clientX: x,
                    clientY: y,
                    bubbles: true
                }))

                animFrame = requestAnimationFrame(loop)
            }
            loop()
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!e.isTrusted) return
            
            cancelAnimationFrame(animFrame)
            clearTimeout(idleTimeout)
            idleTimeout = setTimeout(startIdleAnim, 100)
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        startIdleAnim()

        return () => {
            window.removeEventListener('click', handleClick)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animFrame)
            clearTimeout(idleTimeout)

            if (app && typeof app.destroy === 'function') {
                app.destroy()
            } else if (app && typeof app.dispose === 'function') {
                app.dispose()
            }
        }
    }, [])

    return (
        <canvas 
            id="canvas" 
            ref={canvasRef} 
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    )
}
