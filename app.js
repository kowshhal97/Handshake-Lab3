const express=require('express')
const app=express()
const expressGraphQL=require('express-graphql')

const schema=require('./schema')


app.use('/graphql',expressGraphQL({
    graphiql:true,
    schema:schema
}))


aws.config.update({
    secretAccessKey: 'VwtrGXg9aWjso48/cc+JExDhFL71X4Gs6nePB3S3',
    accessKeyId: 'AKIAITEHYHEDXFIG4KVQ',
    region: 'us-west-2'
  });
  
  const s3 = new aws.S3();
  
  
  const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'handshake-project',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: 'inline',
        key: function (req, file, cb) {
            cb(null, 'profile_' + req.params.id);
        }
    })
  });
  
  const upload2 = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'handshake-project',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: 'inline',
        key: function (req, file, cb) {
          console.log(req.params.id);
            //console.log(file);
            cb(null, 'resume_' + req.params.id);
        }
    })
  });

  app.post('/upload/:id', upload.array('upl',1), (req, res, next) => {
    const id = req.params.id;
    const profile_path = 'https://handshake-project.s3-us-west-2.amazonaws.com/profile_' + id;
    res.status(200).json({msg: 'uploaded!'})
  });
  
  app.post('/upload/resume/:id', upload2.array('upl',1), (req, res, next) => {
  
    res.status(200).json({msg: 'uploaded'});
    
  });


module.exports=app;