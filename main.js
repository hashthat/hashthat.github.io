(async function() {
    const isARSupported = navigator.xr && navigator.xr.isSessionSupported('immersive-ar');
    if (isARSupported) {
        // Initialize XR session if supported
        const xrScene = new XRScene();
        await xrScene.startSession();
    } else {
        console.error('AR not supported on this device.');
    }
})();

class XRScene {
    constructor() {
        this.canvas = null;
        this.gl = null;
        this.scene = null;
        this.session = null;
        this.refSpace = null;
    }

    // Start the XR session
    startSession = async () => {
        try {
            const session = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local', 'dom-overlay'],
                domOverlay: { root: document.getElementById('overlay') } // Ensure 'overlay' exists in HTML
            });
            this.onSessionStarted(session);
        } catch (e) {
            console.error('Error starting AR session: ', e);
        }
    };

    // Create a WebGL canvas for rendering
    XRCanvas = () => {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        document.body.appendChild(this.canvas);
        this.gl = this.canvas.getContext('webgl', { xrCompatible: true });
    };

    // Handle the start of the XR session
    onSessionStarted = (session) => {
        this.session = session;
        session.addEventListener('end', this.onSessionEnded);

        this.XRCanvas(); // Initialize the canvas after the session starts
        this.session.baseLayer = new XRWebGLLayer(this.session, this.gl);

        this.session.requestReferenceSpace('local').then((refSpace) => {
            this.refSpace = refSpace;
            this.session.requestAnimationFrame(this.onXRFrame);
        });
    };

    // Handle the end of the XR session
    onSessionEnded = (event) => {
        this.session.removeEventListener('end', this.onSessionEnded);
        this.session = null;
        this.refSpace = null;
        this.gl = null;
    };

    // Handle each frame during the XR session
    onXRFrame = (time, frame) => {
        const session = this.session;
        const pose = frame.getViewerPose(this.refSpace);

        if (pose) {
            // Handle the camera and scene updates here
            // For example: update scene, render frame, etc.
        }

        // Continue requesting the next frame
        session.requestAnimationFrame(this.onXRFrame);
    };
}

// Initialize and start the AR scene
const xrScene = new XRScene();
document.getElementById('startAR').addEventListener('click', () => xrScene.AXRSession());
