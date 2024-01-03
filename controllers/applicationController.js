
const Application = require("../models/ApplicationModel")


  
function generateAppCode() {
    const length = 6; // veya 6
    const chars = '0123456789'; // İzin verilen karakterler
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
  
    return code;
  }
  

exports.createApplication = async(req,res) => {

    try{
        const {name, lastName, age, tc, applicationReason, address, file} = req.body

        const newApplication = await Application.create({
            name,
            lastName,
            age,
            tc,
            address,
            applicationReason,
            appCode: generateAppCode()
        })

        if (req.file) {
            const { filename, path, originalname } = req.file;
            newApplication.file = {
                filename: filename,
                path: path,
                originalname: originalname,
            };
        }

        res.status(200).json({
            status: "success",
            data: newApplication
        })

    }catch(e){
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
}


exports.getAllAplications = async(req,res) => {

    try{
        const applications = await Application.find()

        res.status(200).json({
            status: "success",
            data: applications
        })

    }catch(e){
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
}

exports.getApplicationByAppCode = async(req,res) => {

    try{
        const appCode = req.params.appCode;
        const application = await Application.findOne({appCode}).populate('statusHistory.updatedBy').populate('answers.user')

        if(!application) {
            return res.status(404).json({
                status: "failed",
                message: "Couldn't find any application"
            })
        }
        res.status(200).json({
            status: "success",
            data: application
        })

    }catch(e){
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
}

exports.updateApplicationStatus = async(req,res) => {

    try{
        const {status, appCode, answer} = req.body

        const application = await Application.findOne({appCode}).populate('statusHistory.updatedBy')

        if (!application) {
            return res.status(404).json({ message: 'Document not found' });
          }
          application.status = status;

          if (answer) {
            const answerObj = {
                answer: answer,
                user: req.user._id, // Assuming req.user._id holds the ID of the user
                createdAt: new Date() // Sets the current date and time
            };
            application.answers.push(answerObj);
        }
             
         
          await application.save({ userId: req.user._id })
         const updatedApplication = await Application.findById(application._id).populate('statusHistory.updatedBy').populate('answers.user');

        res.status(200).json({
            status: "success",
            data: updatedApplication
        })

    }catch(e){
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
}
