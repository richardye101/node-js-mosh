// unit tests for exercise 1

const exercise = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw an error when non-numeric input is passed', () => {
        expect(() => {exercise.fizzBuzz('a')}).toThrow();
        expect(() => {exercise.fizzBuzz(Null)}).toThrow();
        expect(() => {exercise.fizzBuzz(undefined)}).toThrow();
        expect(() => {exercise.fizzBuzz({})}).toThrow();
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = exercise.fizzBuzz(15);
        expect(result).toEqual('FizzBuzz');
    });

    it('should return Fizz if input is only divisible by 3', () => {
        const result = exercise.fizzBuzz(3);
        expect(result).toEqual('Fizz');
    });

    it('should return Buzz if input is only divisible by 5', () => {
        const result = exercise.fizzBuzz(5);
        expect(result).toEqual('Buzz');
    });

    it('should return the input if input is not divisible by 3 or 5', () => {
        const result = exercise.fizzBuzz(1);
        expect(result).toBe(1);
    });
})