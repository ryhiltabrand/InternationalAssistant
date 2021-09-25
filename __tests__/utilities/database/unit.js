import * as database from './../../../app/utilities/database'



function createTestUserInfo() {
    testUser = new database.UsersCollection();
    testUser.setName('test')
    testUser.setDateofBirth("2/22/2222")
    testUser.setEmail('root@cs.odu.edu')
    testUser.setLanguage('English')
    
    testUser.setEvents('Something in the Water')
    testUser.setFriends(['Marquel', 'Goku', 'Snorlax'])
    testUser.setRequests(['JarjarBinks', 'Nick Cannon', 'George Lucas'])


}

// function deleteTestUser() {
//     testUser = new database.UsersCollection();
//     testUser.deleteAccountInformation('root@csoduedu')
// }

test('create new account', () => {
     
   //deleteTestUser()
    createTestUserInfo()
    testUser.createUserAccountInformation()

    return expect(testUser.getAccountInformation('root@cs.odu.edu')).resolves.toMatchObject({
        name: 'test',
        dateofbirth: '2/22/2222',
        email: 'root@cs.odu.edu',
        language: 'English'
    });
})

