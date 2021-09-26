import * as database from './../../../app/utilities/database'



function createTestUserInfo() {
    testUser = new database.UsersCollection();
    testUser.setName('test')
    testUser.setDateofBirth("2/22/2222")
    testUser.setEmail('root@cs.odu.edu')
    testUser.setLanguage(['English', 'Spanish'])
    testUser.setCountry('usa')
    testUser.setBio('I am groot')
    testUser.profilePicture('https://res.cloudinary.com/teepublic/image/private/s--rh264MCI--/t_Preview/b_rgb:484849,c_limit,f_jpg,h_630,q_90,w_630/v1517893785/production/designs/2341977_3.jpg')
    
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
        language: ['English', 'Spanish'],
        country: 'usa',
        bio: 'I am groot',
        profilepicture: 'https://res.cloudinary.com/teepublic/image/private/s--rh264MCI--/t_Preview/b_rgb:484849,c_limit,f_jpg,h_630,q_90,w_630/v1517893785/production/designs/2341977_3.jpg'
    });
})

