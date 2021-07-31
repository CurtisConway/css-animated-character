export default class AnimatedCharacter {
    /**
     * @param {Element} selector
     * @returns AnimatedCharacter
     */
    constructor(selector) {
        this.node = selector;
        this.backwards = false;
        this.animationState = AnimatedCharacter.AnimationStates.Idle;
        this.nextAnimation = AnimatedCharacter.AnimationStates.Idle;

        this.renderCharacter();
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

    /**
     * @param {AnimationStates|Number} state
     * @returns AnimationStates
     */
    setAnimationState(state = AnimatedCharacter.AnimationStates.Idle) {
        requestAnimationFrame(() => {
            this.animationState = state;
            this.character.setAttribute('data-animation', String(state));

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
        if (this.isWaiting) {
            this.nextAnimation = AnimatedCharacter.AnimationStates.Idle;
        } else {
            this.setAnimationState(AnimatedCharacter.AnimationStates.Idle);
        }
    }

    /**
     * @returns void
     */
    walk(backwards = false) {
        if (this.isWaiting) {
            this.nextAnimation = AnimatedCharacter.AnimationStates.Walk;
        } else {
            this.backwards = backwards;
            this.setAnimationState(AnimatedCharacter.AnimationStates.Walk);
        }
    }

    /**
     * @returns void
     */
    jump() {
        if(this.isWaiting) return;
        this.nextAnimation = this.animationState;
        this.setAnimationState(AnimatedCharacter.AnimationStates.Jump);
        setTimeout(() => {
            if (this.nextAnimation === AnimatedCharacter.AnimationStates.Jump) {
                this.nextAnimation = AnimatedCharacter.AnimationStates.Idle;
            }
            this.setAnimationState(this.nextAnimation);
        }, 1000);
    }

    /**
     * @static
     * @returns String - A template string representing the HTML structure of the
     * character skeleton
     */
    static CharacterSkeleton() {
        return `<div class="character idle">
            <div class="frame">
                <div class="body">
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
                    <div class="torso">
                    </div>
                    <div class="head"></div>
                    <div class="waist">
                        <div class="hips"></div>
                        <div class="leg left">
                            <div class="thigh">
                                <div class="pelvis"></div>
                            </div>
                            <div class="calf">
                                <div class="knee"></div>
                                <div class="foot">
                                    <div class="ankle"></div>
                                </div>
                            </div>
                        </div>
                        <div class="leg right">
                            <div class="thigh">
                                <div class="pelvis"></div>
                            </div>
                            <div class="calf">
                                <div class="knee"></div>
                                <div class="foot">
                                    <div class="ankle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * @static
     * @returns Object
     */
    static AnimationStates = Object.freeze({
        Idle: 0,
        Walk: 1,
        Jump: 2,
    });
}
