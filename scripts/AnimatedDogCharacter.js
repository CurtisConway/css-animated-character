import AnimatedCharacter from "./AnimatedCharacter";

export default class AnimatedDogCharacter extends AnimatedCharacter {
    /**
     * @constructor
     * @param {Element} node
     * @returns {AnimatedDogCharacter}
     */
    constructor(node) {
        super(node);
    }

    /**
     * @returns {void}
     */
    renderCharacter() {
        this.node.innerHTML = AnimatedDogCharacter.CharacterSkeleton();
        this.character = this.node.children[0];
    }

    /**
     * @static
     * @returns String - A template string representing the HTML structure of the
     * character skeleton
     */
    static CharacterSkeleton() {
        return `<div class="dog">
            <div class="frame">
                <div class="body">
                    <div class="rear">
                        <div class="shoulder left">
                            <div class="leg">
                                <div class="upper"></div>
                                <div class="lower">
                                    <div class="foot"></div>
                                </div>
                            </div>
                        </div>
                        <div class="shoulder right">
                            <div class="leg">
                                <div class="upper"></div>
                                <div class="lower">
                                    <div class="foot"></div>
                                </div>
                            </div>
                        </div>
                        <div class="tail">
                            <div class="section one">
                                <div class="section two">
                                    <div class="section three">
                                        <div class="section four"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="torso">
                        <div class="neck">
                            <div class="head"></div>
                        </div>
                        <div class="shoulder left">
                            <div class="leg">
                                <div class="upper"></div>
                                <div class="lower">
                                    <div class="foot"></div>
                                </div>
                            </div>
                        </div>
                        <div class="shoulder right">
                            <div class="leg">
                                <div class="upper"></div>
                                <div class="lower">
                                    <div class="foot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
}
