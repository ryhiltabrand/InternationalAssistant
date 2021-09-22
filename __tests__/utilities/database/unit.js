import * as database from './../../../app/utilities/database'

test('create new account', () => {
    testUser = new database.UsersCollection();
    testUser.setName('test')
    testUser.setDateofBirth("2/22/2222")
    testUser.setEmail('root@cs.odu.edu')
    testUser.setLanguage('English')
    
    testUser.createUserAccountInformation()

    expect(testUser.getAccountInformation('root.cs.odu.edu').toEqual({
        name: 'test',
        dateofbirth: '2/22/2222',
        email: 'root@cs.odu.edu',
        language: 'English'
    }))
});