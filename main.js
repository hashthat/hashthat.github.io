(async function () {
    if (navigator.xr && navigator.xr.isSessionSupported) {
        const isARSupported = await navigator.xr.isSessionSupported('immersive-ar');
        if (!isARSupported) {
            console.error("AR is not supported on this device.");
        }
    } else {
        console.error("WebXR is not available in this browser.");
    }
})();

// Class to manage the XR scene
class XRScene {
    constructor() {
        this.canvas = null;
        this.gl = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.session = null;
        this.refSpace = null;
    }

    // Create a WebGL canvas and append it to the document
    XRCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        document.body.appendChild(this.canvas);

        this.gl = this.canvas.getContext('webgl', { xrCompatible: true });
    }

    // Start an AR session
    async AXRSession() {
        try {
            const session = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local', 'dom-overlay'],
                domOverlay: { root: document.getElementById('overlay') }
            });
            this.onSessionStarted(session);
        } catch (error) {
            console.error("Failed to start AR session:", error);
        }
    }

    // Handle session start
    async onSessionStarted(session) {
        this.session = session;
        session.addEventListener('end', this.onSessionEnded.bind(this));

        this.XRCanvas();

        this.session.baseLayer = new XRWebGLLayer(this.session, this.gl);

        // Create the scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            70, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, context: this.gl });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(this.onXRFrame.bind(this));

        try {
            this.refSpace = await this.session.requestReferenceSpace('local');
            this.session.requestAnimationFrame(this.onXRFrame.bind(this));
        } catch (error) {
            console.error("Failed to set up reference space:", error);
        }
    }

    // Handle rendering in each animation frame
    onXRFrame(time, frame) {
        const session = this.session;
        const pose = frame.getViewerPose(this.refSpace);

        if (pose) {
            this.renderer.clear();

            // Update camera based on pose
            const view = pose.views[0];
            const viewport = session.baseLayer.getViewport(view);
            this.renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);

            this.camera.matrix.fromArray(view.transform.matrix);
            this.camera.projectionMatrix.fromArray(view.projectionMatrix);
            this.camera.updateMatrixWorld(true);

            // Render the scene
            this.renderer.render(this.scene, this.camera);
        }

        session.requestAnimationFrame(this.onXRFrame.bind(this));
    }

    // Handle session end
    onSessionEnded() {
        console.log("AR session ended.");
        this.session.removeEventListener('end', this.onSessionEnded);
        this.session = null;
        this.refSpace = null;
        this.gl = null;
    }
}

// Initialize and start the AR scene
const xrScene = new XRScene();
document.getElementById('startAR').addEventListener('click', () => xrScene.AXRSession());
