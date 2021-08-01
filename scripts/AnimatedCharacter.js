export default class AnimatedCharacter {
    /**
     * @static
     * @returns Object
     */
    static get AnimationStates() {
        return Object.freeze({
            Idle: 0,
            Walk: 1,
            Jump: 2,
        });
    }

    /**
     * @param {Element} selector
     * @returns AnimatedCharacter
     */
    constructor(selector) {
        this.node = selector;
        this.backwards = false;
        this.animationState = AnimatedCharacter.AnimationStates.Idle;
        this.nextAnimation = AnimatedCharacter.AnimationStates.Idle;
        this.shadow = null;

        this.renderCharacter();
        this.renderShadow();
        this.idle();
        return this;
    }

    /**
     * @returns Boolean
     */
    get isIdle() {
        return this.animationState === AnimatedCharacter.AnimationStates.Idle;
    }

    /**
     * @returns Boolean
     */
    get isWalking() {
        return this.animationState === AnimatedCharacter.AnimationStates.Walk;
    }

    /**
     * @returns Boolean
     */
    get isJumping() {
        return this.animationState === AnimatedCharacter.AnimationStates.Jump;
    }

    /**
     * @returns Boolean
     */
    get isMoving() {
        return this.isWalking || this.isJumping;
    }

    get isWaiting() {
        return this.isJumping;
    }

    /**
     * @returns Boolean
     */
    renderCharacter() {
        this.node.innerHTML = AnimatedCharacter.CharacterSkeleton();
        this.character = this.node.children[0];
    }

    renderShadow() {
        this.shadow = document.createElement('div');
        this.shadow.classList.add('shadow');
        this.character.appendChild(this.shadow);
        this.shadow.innerHTML = AnimatedCharacter.CharacterSkeleton();
    }

    /**
     * @param {AnimationStates|Number} state
     * @param {Boolean} queueAnimation
     * @returns AnimationStates|Number
     */
    setAnimationState(state = AnimatedCharacter.AnimationStates.Idle, queueAnimation = false) {
        if (queueAnimation) {
            this.nextAnimation = state;
            return this.nextAnimation;
        }
        this.animationState = state;
        requestAnimationFrame(() => {
            this.character.setAttribute('data-animation', String(this.animationState));

            if (this.backwards) {
                this.character.classList.add('backwards');
            } else {
                this.character.classList.remove('backwards');
            }

            return this.animationState;
        });
    }

    /**
     * @returns void
     */
    idle() {
        this.setAnimationState(AnimatedCharacter.AnimationStates.Idle, this.isWaiting);
    }

    /**
     * @param {Boolean} backwards
     * @returns void
     */
    walk(backwards = false) {
        this.backwards = backwards;
        this.setAnimationState(AnimatedCharacter.AnimationStates.Walk, this.isWaiting);
    }

    /**
     * @returns void
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
