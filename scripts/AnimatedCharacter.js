export default class AnimatedCharacter {

    /**
     * @static
     * @readonly
     * @enum {String}
     */
    static get AnimationStates() {
        return Object.freeze({
            Idle: 'idle',
            Walk: 'walk',
            Jump: 'jump',
            Sit: 'sit',
        });
    }

    /**
     * @static
     * @readonly
     * @enum {String}
     */
    static get EventTypes() {
        return Object.freeze({
            StateChange: 'state',
            DirectionChange: 'direction',
        });
    }

    /**
     * @constructor
     * @param {Element} node
     * @returns {AnimatedCharacter}
     */
    constructor(node) {
        this.node = node;
        this.backwards = false;
        this.animationState = AnimatedCharacter.AnimationStates.Idle;
        this.nextAnimation = AnimatedCharacter.AnimationStates.Idle;

        this.renderCharacter();
        this.idle();
    }

    /**
     * @readonly
     * @returns {Boolean}
     */
    get isIdle() {
        return this.animationState === AnimatedCharacter.AnimationStates.Idle;
    }

    /**
     * @readonly
     * @returns {Boolean}
     */
    get isWalking() {
        return this.animationState === AnimatedCharacter.AnimationStates.Walk;
    }

    /**
     * @readonly
     * @returns {Boolean}
     */
    get isJumping() {
        return this.animationState === AnimatedCharacter.AnimationStates.Jump;
    }

    /**
     * @readonly
     * @returns {Boolean}
     */
    get isMoving() {
        return this.isWalking || this.isJumping;
    }

    /**
     * @readonly
     * @returns {Boolean}
     */
    get isWaiting() {
        return this.isJumping;
    }

    /**
     * @returns {void}
     */
    renderCharacter() {
        this.node.innerHTML = AnimatedCharacter.CharacterSkeleton();
        this.character = this.node.children[0];
    }

    /**
     * @param {String} state
     * @param {Boolean} queueAnimation
     * @returns {String}
     */
    setAnimationState(state = AnimatedCharacter.AnimationStates.Idle, queueAnimation = false) {
        const oldState = this.animationState;
        if (queueAnimation) {
            this.nextAnimation = state;
            return this.nextAnimation;
        }
        this.animationState = state;
        requestAnimationFrame(() => {
            this.character.setAttribute('data-animation', this.animationState);

            if (this.backwards) {
                this.character.classList.add('backwards');
            } else {
                this.character.classList.remove('backwards');
            }

            if(oldState !== this.animationState) {
                this.animationChangeEvent(oldState, this.animationState);
            }
            return this.animationState;
        });
    }

    /**
     * @returns {void}
     */
    idle() {
        this.setAnimationState(AnimatedCharacter.AnimationStates.Idle, this.isWaiting);
    }

    /**
     * @param {Boolean} backwards
     * @returns {void}
     */
    walk(backwards = false) {
        if (this.backwards !== backwards) {
            this.backwards = backwards;
            this.directionChangeEvent(backwards);
        }
        this.setAnimationState(AnimatedCharacter.AnimationStates.Walk, this.isWaiting);
    }

    /**
     * @returns {void}
     */
    jump() {
        if(this.isWaiting) return;
        this.nextAnimation = this.animationState;
        this.setAnimationState(AnimatedCharacter.AnimationStates.Jump);
        setTimeout(() => {
            this.setAnimationState(this.nextAnimation, false);
        }, 1000);
    }

    /**
     * @returns {void}
     */
    sit() {
        this.setAnimationState(AnimatedCharacter.AnimationStates.Sit, this.isWaiting);
    }

    /**
     * @param {String} old
     * @param {String} current
     * @returns {void}
     */
    animationChangeEvent(old, current) {
        const event = new CustomEvent(AnimatedCharacter.EventTypes.StateChange, {
            detail: {
                old,
                current,
                character: this,
            }
        });
        this.node.dispatchEvent(event);
    }

    /**
     * @returns {void}
     */
    directionChangeEvent(backwards) {
        const event = new CustomEvent(AnimatedCharacter.EventTypes.DirectionChange, {
            detail: {
                backwards,
                character: this,
            }
        });
        this.node.dispatchEvent(event);
    }

    /**
     * @static
     * @returns String - A template string representing the HTML structure of the
     * character skeleton
     */
    static CharacterSkeleton() {
        return `<div class="character">
            <div class="frame">
                <div class="body">
                    <div class="head"></div>
                    <div class="torso"></div>
                    <div class="arm left">
                        <div class="bicep">
                            <div class="shoulder"></div>
                        </div>
                        <div class="forearm">
                            <div class="elbow"></div>
                            <div class="hand"></div>
                        </div>
                    </div>
                    <div class="arm right">
                        <div class="bicep">
                            <div class="shoulder"></div>
                        </div>
                        <div class="forearm">
                            <div class="elbow"></div>
                            <div class="hand"></div>
                        </div>
                    </div>
                    <div class="waist">
                        <div class="hips"></div>
                        <div class="leg left">
                            <div class="thigh">
                                <div class="pelvis"></div>
                            </div>
                            <div class="calf">
                                <div class="knee"></div>
                                <div class="ankle"></div>
                                <div class="foot"></div>
                            </div>
                        </div>
                        <div class="leg right">
                            <div class="thigh">
                                <div class="pelvis"></div>
                            </div>
                            <div class="calf">
                                <div class="knee"></div>
                                <div class="ankle"></div>
                                <div class="foot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
}
