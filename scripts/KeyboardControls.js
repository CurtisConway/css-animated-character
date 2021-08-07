export default class KeyboardControls {
    /**
     * @param {AnimatedCharacter} character
     * @param {Object} keymap
     * @returns KeyboardControls
     */
    constructor(character, keymap = {}) {
        this.character = character;
        this.keymap = {
            Forward: ['KeyD', 'ArrowRight'],
            Backward: ['KeyA', 'ArrowLeft'],
            Jump: ['KeyW', 'ArrowUp', 'Space'],
            ...keymap,
        };
        this.keyUpEvent = null;
        this.keyDownEvent = null;
        this.keysDown = {};

        this.start();
        return this;
    }

    /**
     * @returns Boolean
     */
    get isForward() {
        return this.keymap.Forward.find((key) => this.keysDown[key] === true) != null;
    }

    /**
     * @returns Boolean
     */
    get isBackward() {
        return this.keymap.Backward.find((key) => this.keysDown[key] === true) != null;
    }

    /**
     * @returns Boolean
     */
    get isJumping() {
        return this.keymap.Jump.find((key) => this.keysDown[key] === true) != null;
    }

    /**
     * @returns Boolean
     */
    get isWalking() {
        return this.isForward || this.isBackward;
    }

    /**
     * @param {KeyboardEvent} event
     * @returns void
     */
    keydownListener(event) {
        this.keysDown[event.code] = true;

    }

    /**
     * @param {KeyboardEvent} event
     * @returns void
     */
    keyUpListener(event) {
        event.stopPropagation();
        event.preventDefault();
        this.keysDown[event.code]  = false;
    }

    /**
     * @returns void
     */
    play() {
        this.pause();
        this.inputInterval = setInterval(() => {
            requestAnimationFrame(() => {
                if (this.isJumping) {
                    this.character.jump();
                } else {
                    if (this.isWalking) {
                        this.character.walk(this.isBackward);
                    } else {
                        this.character.idle();
                    }
                }
            });
        }, 600);
    }

    /**
     * @returns void
     */
    pause() {
        clearInterval(this.inputInterval);
    }

    /**
     * @returns void
     */
    start() {
        this.play();
        document.removeEventListener('keydown', this.keyDownEvent);
        document.removeEventListener('keyup', this.keyUpEvent);
        document.addEventListener('keydown', this.keyDownEvent = (event) => this.keydownListener(event));
        document.addEventListener('keyup', this.keyUpEvent = (event) => this.keyUpListener(event));
    }

    /**
     * @returns void
     */
    destroy() {
        this.pause();
        document.removeEventListener('keydown', this.keyDownEvent);
        document.removeEventListener('keyup', this.keyUpEvent);
        delete this;
    }
}
