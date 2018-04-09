 var pageApp = angular.module("pageApp", ["ui.router"]);

      pageApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.when("", "/home");
        $urlRouterProvider.otherwise("/home");
        $stateProvider
          // HOME STATE ROUTE
          .state("home", {
            url: "/home",
            templateUrl: "/table.html"
          })
          // CONTACT PAGE ROUTE
          .state("contact", {
            url: "/contact",
            templateUrl: "/contactForm.html"
          });
      });
          
      //service
      pageApp.service('ContactService', function () {

        //contacts array to hold list of all contacts
        var contacts = [{
            id: 1,
            'fname': 'John',
            'lname': 'Smith',
                'email': [ { work:'johnwork@gmail.com', personal:'johnpersonal@gmail.com' }],
                'phone':  [{ work:'1232343474' , personal:'1234123412'} ]
        },
   {
        id: 2,
        'fname': 'Jane',
        'lname': 'Doe',
            'email': [ { work:'janew@gmail.com' , personal:'janep@gmail.com' }],
            'phone':  [{ work:'5678956789' , personal:'9876556789'} ]
    }
]; 
  
          this.save = function (contact) {
            if (contact.id == null) {
                //if this is new contact, add it in contacts array
                contact.id = ++uid;
                contacts.push(contact);
            } else {
                //for existing contact, find this contact using id
                //and update it.
                for (i in contacts) {
                    if (contacts[i].id == contact.id) {
                        contacts[i] = contact;
                    }
                }
            }
          }
        // returns the contacts list
        this.list = function () {     
            return contacts;
        }
      });
      var uid = 2; 
      pageApp.controller("pageAppController", function($scope, $http, ContactService) {
            $scope.contacts = ContactService.list();
              $scope.saveContact = function (newcontact) {
              ContactService.save(newcontact);   
            //   debugger     
              $scope.newcontact = {};
          } 
        });