import AnimatedCharacter from "../scripts/AnimatedCharacter";

describe('AnimatedCharacter', () => {
    document.body.innerHTML = `<div id="character"></div>`;
    let node = document.getElementById('character');
    let character;
    beforeEach(() => {
        character = new AnimatedCharacter(node);
    });

    it('can mount', () => {
        expect(character.node).toBe(node);
    });

    it('has a skeleton', () => {
        const skeleton = character.character;
        expect(skeleton.outerHTML).toBe(AnimatedCharacter.CharacterSkeleton());
    });

    it('has an idle state', (done) => {
        character.idle();

        requestAnimationFrame(() => {
            expect(character.animationState).toBe(AnimatedCharacter.AnimationStates.Idle);
            expect(character.character.dataset['animation']).toBe(AnimatedCharacter.AnimationStates.Idle);
            expect(character.isIdle).toBe(true);
            done();
        });
    });

    it('has a walking state', (done) => {
        character.walk();

        requestAnimationFrame(() => {
            expect(character.animationState).toBe(AnimatedCharacter.AnimationStates.Walk);
            expect(character.character.dataset['animation']).toBe(AnimatedCharacter.AnimationStates.Walk);
            expect(character.isWalking).toBe(true);
            expect(character.isMoving).toBe(true);
            done();
        });
    });

    it('can walk backwards', (done) => {
        character.walk(true);

        requestAnimationFrame(() => {
            expect(character.backwards).toBe(true);
            done();
        });
    });

    it('has a jumping state', (done) => {
        character.jump();

        requestAnimationFrame(() => {
            expect(character.animationState).toBe(AnimatedCharacter.AnimationStates.Jump);
            expect(character.character.dataset['animation']).toBe(AnimatedCharacter.AnimationStates.Jump);
            expect(character.isWaiting).toBe(true);
            expect(character.isJumping).toBe(true);
            expect(character.isMoving).toBe(true);
            done();
        });
    });

    it('dispatches an event on animation change', (done) => {
        function handler(event) {
            expect(event.detail.character).toBe(character);
            expect(character.animationState).toBe(event.detail.current);
            expect(event.detail.current).toBe(AnimatedCharacter.AnimationStates.Jump);
            character.node.removeEventListener(AnimatedCharacter.EventTypes.StateChange, handler);
            done();
        }

        character.node.addEventListener(AnimatedCharacter.EventTypes.StateChange, handler);
        character.jump();
    });

    it('queues an animation if it is waiting', (done) => {
        character.jump();
        character.walk();
        requestAnimationFrame(() => {
            expect(character.animationState).toBe(AnimatedCharacter.AnimationStates.Jump);
            expect(character.nextAnimation).toBe(AnimatedCharacter.AnimationStates.Walk);
            done();
        });
    });
});
