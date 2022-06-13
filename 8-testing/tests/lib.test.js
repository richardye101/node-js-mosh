// Num unit tests >= execution paths for a given function
const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    // absolute: there are three possible execution paths, so we need at least 3 unit tests
    it('should return positive num if input positive', () => {
        const result = lib.absolute(1); // avoid arbitrary numbers, use a simple value like 1
        expect(result).toBe(1); // function from jest, but won't work with floating pt numbers
        // toBeCLoseTo for floating pt numbers
    });

    it('should return positive num if input negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 if input 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mosh');
        // expect(result).toBe('Welcome Mosh'); // too specific, a simple '!' will break it, but too general does not give confidence 
        expect(result).toMatch(/Mosh/);
        // or
        expect(result).toContain('Mosh');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Too general
        // expect(result).toBeDefined(); // anything other than null will pass
        // expect(result).not.toBeNull(); // also useless

        // Too specific, the exact position of the elements are tested
        // expect(result[0]).toBe('USD');
        // expect(result[0]).toBe('AUD');
        // expect(result[0]).toBe('EUR');

        // Too specific
        // expect(result.length).toBe(3); // may add new currencies that will break this

        // Proper test, existence of elements
        // expect(result).toContain('USD');
        // expect(result).toContain('AUD');
        // expect(result).toContain('EUR');
        // or ideally
        expect(result).toEqual(expect.arrayContaining(['AUD', 'EUR', 'USD']));

    })
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);

        // expect(result).toBe({id: 1, price: 10}); // toBe compares the memory references, not the values.
        // expect(result).toEqual({id: 1, price: 10});
        
        // or (above has exactly the above, the below just asks for at least these properties)
        expect(result).toMatchObject({id: 1, price: 10});

        // or dont care abt other properties, just id (need to made sure the type is correct)
        // expect(result).toHaveProperty('id', '1');
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        // falsy values: Null, undefined, Nan, '', 0, false
        // const result = lib.registerUser(null);
        // expect(result).toThrow(); // doesnt make sense, since we don't get a result

        expect(()=> { lib.registerUser(null) }).toThrow();

        // Ideally parametrized tests, but don't have them when he recorded
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(()=> { lib.registerUser(a) }).toThrow(); 
            // or could test for each value in a separate test case for single assertion principle
            // no need bc they test the same logic
        })
    });

    it('should return a user object if valid username is passed', ()=> {
        const result = lib.registerUser('Mosh');
        expect(result).toMatchObject({username: 'Mosh'});
        expect(result.id).toBeGreaterThan(0); // two assertions, but logically about one object
    })
});

// creating mock functions to test the interaction between modules/functions
describe('applyDiscount', () => {
    it('should apply 10% discount if the customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            // a fake/mock function
            console.log('Fake reading customer...');
            return { id: customerId, points: 20};
        }

        const order = { customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
})

// using jest to create mock functions
describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {

        // const mockFunction = jest.fn(); // an empty function that returns what you need
        // mockFunction.mockReturnValue(1); // get a value
        // const result = mockFunction();
        // mockFunction.mockResolvedValue(1); // get a promise
        // mockFunction.mockRejectedValue(new Error('...'));
        // const result = await mockFunction();

        // db.getCustomerSync = function(customerId) {
        //     return { email: 'a'}
        // }
        // as a jest mock fn
        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});

        
        // let mailSent = false;
        // mail.send = function(email, message) {
        //     mailSent = true;
        // }
        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1});

        // expect(mailSent).toBe(true);
        // expect(mail.send).toHaveBeenCalledWith('a', '...'); // just checking if it has been called, but shouldn't do with strings (using ...With)
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/); // as long as we have order in the message
    });

})