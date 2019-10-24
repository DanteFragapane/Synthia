function createGrapher (audioContext, canvasElem, samplesPerPoint) {
  const graphPoints = canvasElem.width
  let minY = -1
  let maxY = 1.0

  const graphDataMin = new Float32Array(graphPoints)
  const graphDataMax = new Float32Array(graphPoints)
  let graphDataStartIdx = 0
  const grapherNode = audioContext.createScriptProcessor(samplesPerPoint, 3, 1)
  grapherNode.onaudioprocess = function (e) {
    const inputData = e.inputBuffer.getChannelData(0)
    const outputData = e.outputBuffer.getChannelData(0)

    const minValue = Math.min.apply(null, inputData)
    const maxValue = Math.max.apply(null, inputData)
    graphDataMin[graphDataStartIdx] = minValue
    graphDataMax[graphDataStartIdx] = maxValue
    graphDataStartIdx++
    if (graphDataStartIdx === graphPoints) {
      graphDataStartIdx = 0
    }

    // Copy input to output unmodified
    for (let i = 0; i < inputData.length; i++) {
      outputData[i] = inputData[i]
    }
  }

  const canvasCtx = canvasElem.getContext('2d')
  let rafId

  function drawData (data, color) {
    canvasCtx.lineWidth = 30
    canvasCtx.strokeStyle = color

    canvasCtx.beginPath()

    for (let x = 0; x < graphPoints; x++) {
      const idx = graphDataStartIdx + x
      if (idx >= graphPoints) {
        idx -= graphPoints
      }

      const y = canvasElem.height * (1 - (data[idx] - minY) / (maxY - minY))

      if (x === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }
    }

    canvasCtx.stroke()
  }

  function draw () {
    canvasCtx.fillStyle = 'rgba(5, 0, 0, 10)'
    canvasCtx.fillRect(0, 0, canvasElem.width, canvasElem.height)

    // Draw x axis
    const zeroY = canvasElem.height * (1 + minY / (maxY - minY))
    canvasCtx.strokeStyle = 'rgba(0, 50, 255, 20)'
    canvasCtx.beginPath()
    canvasCtx.moveTo(0, zeroY)
    canvasCtx.lineTo(canvasElem.width, zeroY)
    canvasCtx.stroke()

    drawData(graphDataMin, 'rgba(300, 112, 77, 10)')
    drawData(graphDataMax, 'rgba(50, 255, 100, 10)')

    rafId = requestAnimationFrame(draw)
  }
  draw()

  return grapherNode
}

export default createGrapher
