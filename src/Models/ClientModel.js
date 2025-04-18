import  mongoose,{ Schema, models }  from 'mongoose';

const clientModel= new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }

},
{timestamos:true}
)

const Client=models?.Client || mongoose.model('Client', clientModel);
export default Client;

// const Invoice=models.Invoice || mongoose.model('Invoice', invoiceModel);
// export default Invoice
