const mongoose = require('mongoose');
// Mondule crypto pour SHA1
const crypto = require('crypto')
var url = "mongodb://localhost:27017/mern03";
const PORT = 4242;

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var User = require('./usermodel');
var Post = require('./postmodel');
var Comment = require('./commentmodel');
var Follow = require('./followmodel');
var Following = require('./followingmodel');

mongoose.connect(url, {useUnifiedTopology: true },function(err,db){
if(err){
  throw err;
}
console.log("database created!");
const express = require('express')
const app = express()
//const userRoutes=express.Router();
app.use(cookieParser());
app.use(session({secret: "garde  ma session"}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')


const APIRoutes = express.Router();
    APIRoutes.route('/users').get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                console.log(err);
            } else {
                res.json(users);
            }
        });
    });
    
    APIRoutes.route('/create').post(function(req, res) {
        let user = new User(req.body);
        //         let regex= /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ ;
//           if(user.password != req.body.conf_password){
//             errors.push("Mot de passe pas identique");
//             }
//           if(user.login.length <5|| user.login.length>20 ){
//               errors.push("Login doit être  5 et 20");
//             }
//           if (regex.test(user.email) ==false){
//             errors.push("Email doit être du format xxx.xxx@xxx.xx");
//           }
// //var regex = /hello/; var str = 'hello world'; var result = regex.test(str); console.log(result); returns true
//         if(user.login) {
//             User.find({ login: req.body.login }, function(err, users) {
//                 // verifie que que le login n'existe pas déjà dans liste des "users" qui match (normalement qu'un seul)
//                 if (users.length == 0) {
//                          console.log(user);
//                     if (errors.length > 0) {
//                         res.render('register', {'errors': errors});
//                                            }
//                     // On crypte le mo de passe avant la sauvegarde
user.password = toSha1(user.password);
            user.save()
                .then(user => {
                    res.status(200).json({'user': 'user added successfully'});
                        })
                .catch(err => {
                    res.status(400).send('adding new user failed');
                          });
                                    //   }
                // else {
                //  errors.push("Login existe déjà");
                //  res.render('register', {'errors': errors});
                //      }
                //  })
                //     }
                })

                
    APIRoutes.route('/login').post(function(req, res) {
        // On prends le login et on lke cherche en base de données
        User.find({ login: req.body.login }, function(err, users) {
            // users liste des users qui match (normalement qu'un seul)
            if(users.length ==0){
                res.status(400).json({'status': 'fail', 'errors' : "mot de passe ou login incorrect"});
                return;
            } else {
                user = users[0];
                if (user.password == toSha1(req.body.password)) {
                    res.status(200).json({'status': 'ok'});
                } else {
                    res.status(400).json({'status': 'fail', 'errors' : "mot de passe ou login incorrect"});
                }
            }
        });
    });
    
    
    APIRoutes.route('/update/:login').post(function(req, res) {
        User.findOne({login:req.params.login},function(err,user){
            if (user){
                console.log('dara')
                user.email=req.body.email
                console.log(req.body.email)
                user.password = toSha1(req.body.password)
                console.log(req.body.password)
                console.log(user.password)
                user.save()
                .then(user => {
                    res.status(200).json({'user': 'user update successfully'});
                })
                .catch(err => {
                    res.status(400).send('adding update user failed');
                });
                //   }
            }
            else{
                res.status(404).send("data is not found");}
            })
        });      
        
        APIRoutes.route('/profil/:login').get(function(req, res) {
            let login = req.params.login;
            console.log("doing monprofil");
            //console.log(login);
            User.find({ login: login }).populate('follows','followings')
            .then(result=>{
                res.json(result)
                console.log("mes results",result);
            })
            .catch((error)=>{
                console.log("error:",error);
                res.status(405).json(error)
            });
         });

         // APIRoutes.route('/following/:login/:logged').post(function(req, res) {
        //     let login = req.params.login;
         //      let logged= req.params.logged
        //     let following = new following();
        //let follow=new followers ()
        //     console.log ('je follow')
                  // following.login=logged
                   //follow.login=login
        //         following.save()
       //          follow.save()
        //             .then(result => {
        //                 console.log('danserle vha')
        //                 User.find({login:login} , (err, user) => {
        //                     console.log('danser')
        //                     if (user) {
        //                         console.log('danserle manbo')
        //                          // The below two lines will add the newly saved review's 
        //                         // ObjectID to the the User's reviews array field
        //                         user.followings.push(following.id);
        //                         user.save();
        //                         res.json({ message: 'Review created!' });
        //                     };//
        //                 })
      //                      User.find({login:logged} , (err, user) => {
            //                     console.log('danser')
            //                     if (user) {
            //                         console.log('danserle manbo')
            //                          // The below two lines will add the newly saved review's 
            //                         // ObjectID to the the User's reviews array field
            //                         user.follows.push(follow.id);
            //                         user.save();
            //                         res.json({ message: 'Review created!' });
        //             })   
        //             .catch(err => {
        //                 res.status(400).send('adding new comment failed');
        //                       });
        //             })


        //     User.find({ login: login }, function(err, users) {
        //         if (err) {
        //             res.json([]);
        //         } else {
        //             res.json(users);
        //         }
        //     });
        // });
        APIRoutes.route('/testlogin').post(function(req, res) {
            let login = req.body.login;
            console.log("doing mon test");
            //console.log(login);
            User.find({ login: login }, function(err, users) {
                if (users.length==0) {
                    res.status(200).json({'login': 'teste'});
                } else {
                    res.status(403).send("choco");
                }
            });
        });

        APIRoutes.route('/delete/:login').get(function(req, res) {

            User.deleteOne({ login: req.params.login }, function(err, user){
               console.log(req.params.login)
               console.log('carreau')
                    if(err) {res.json(err);}
                    else {
                       
                        res.json('Successfully removed user');}
                });
            }); 

            APIRoutes.route('/allposts').get(function(req, res) {
                Post.find(function(err, posts) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(posts);
                    }
                });
            });
        
            APIRoutes.route('/allposts/create').post(function(req, res) {
                let post = new Post(req.body);
                    post.save()
                        .then(post => {
                            res.status(200).json({'post': 'post added successfully'});
                                })
                        .catch(err => {
                            res.status(400).send('adding new post failed');
                                  });
                        })
        
            APIRoutes.route('/comment/:id').post(function(req, res) {
                let id = req.params.id;
                let comment = new Comment(req.body);
                console.log ('je suis')
                    comment.save()
                        .then(result => {
                            console.log('danserle vha')
                            Post.findById(id , (err, post) => {
                                console.log('danser')
                                if (post) {
                                    console.log('danserle manbo')
                                     // The below two lines will add the newly saved review's 
                                    // ObjectID to the the User's reviews array field
                                    post.comments.push(comment.id);
                                    post.save();
                                    res.json({ message: 'Review created!' });
                                };
                            })
                        })   
                        .catch(err => {
                            res.status(400).send('adding new comment failed');
                                  });
                        })
                        // export const createReview = (req, res) => {
                        //     const review = new Review();
                        //     review.username = req.body.username;
                        //     review.rating = req.body.rating;
                        //     review.body = req.body.body;
                        //     review.save()
                        //       .then((result) => {
                        //         User.findOne({ username: review.username }, (err, user) => {
                        //             if (user) {
                        //                 // The below two lines will add the newly saved review's 
                        //                 // ObjectID to the the User's reviews array field
                        //                 user.reviews.push(review);
                        //                 user.save();
                        //                 res.json({ message: 'Review created!' });
                        //             }
                        //         });
                        //       })
                        //       .catch((error) => {
                        //         res.status(500).json({ error });
                        //       });
                        // };
        APIRoutes.route('/updatepost/:id').post(function(req, res) {
            let id = req.params.id;
            Post.findById(id,function(err,post){
                if(post){
                    console.log('postier')
                     post.contenu=req.body.contenu
                     console.log(req.body.contenu)
                     post.title = req.body.title
                     console.log(req.body.title)
                      
                     post.save()
                     .then(post => {
                         res.status(200).json({'post': 'post update successfully'});
                             })
                     .catch(err => {
                         res.status(400).send('update post failed');
                               });
                                         //   }
                           }
                    else{
                        res.status(404).send("data is not found");}
                })
          });      

    APIRoutes.route('/monblog/:login').get(function(req, res) {
        let login = req.params.login;
        console.log("doing monpost");
        console.log(login);
        Post.find({ login: login }, function(err, posts) {
            if (err) {
                res.json([]);
            } else {
                res.json(posts);
            }
        });
    });

    // APIRoutes.route('/post/:id').get(function(req, res) {
    //     let id = req.params.id;
    //     console.log("monpost");
    //     console.log(id);
    //     Post.find({ _id: id }, function(err, posts) {
    //         if (err) {
    //             res.json([]);
    //         } else {
    //             res.json(posts);
    //         }
    //     });
    // });
    APIRoutes.route('/post/:id').get( function(req, res) {
        let id = req.params.id;
        console.log("monpost");
        console.log(id);
       Post.find({ _id: id }).populate('comments')
       .then(result=>{
           res.json(result)
           console.log("mes results",result);
       })
       .catch((error)=>{
           console.log("error:",error);
           res.status(405).json(error)
       });
    });
    // APIRoutes.route('/post/:id').get( function(req, res) {
    //     let id = req.params.id;
    //     console.log("monpost");
    //     console.log(id);
    //    Post.find({ _id: id }, function(err, posts) {      
    //         if (err) {
    //             res.json([]);
    //         } else {
    //             res.json(posts);
    //         }
    //     });
    // });

    APIRoutes.route('/deletepost/:id').get(function(req, res) {

        Post.deleteOne({ _id: req.params.id }, function(err, post){
           console.log(req.params.id)
           console.log('carottre')
                if(err) {res.json(err);}
                else {
                   
                    res.json('Successfully removed');}
            });
        }); 

    app.use('/api',APIRoutes);
    

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
   });
  });

   function toSha1(password){
    // On crée notre Hasher avec l'algo qu'on veux
    var shasum = crypto.createHash('sha1');
    // ce qu'on veux hasher
    shasum.update(password);
    // hex => Format de retour hex 012345679abcdef (base 16)
    return shasum.digest('hex');
}
 