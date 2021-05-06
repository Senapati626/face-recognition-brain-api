const app = new Clarifai.App({
    apiKey: '1083b1b302ab4491a31feccd6017b8f1'
   });

const handleAPIcall = (req,res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('api not working '))
}

module.exports = {
    handleAPIcall: handleAPIcall
}
