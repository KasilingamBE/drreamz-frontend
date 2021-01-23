import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

const GET_VEHICLE = gql`
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
      _id
      userId
      profileType
      licensePlate
      type
      make
      model
      year
      size
      color
      image
      createdAt
    }
  }
`;
const AddVehicleModal = ({
    show,
    handleClose,
    handleSave,
    handleUpdate = () => {},
    edit = false,
    id = '',
    userId,
    profileType
  }) => {
    // const [activeIndex,setActiveIndex] = useState(1);
    // const [progress,setProgress] = useState(0);
    var date = new Date();
    var years = [];
    const [vehicle, setVehicle] = useState({
      image: '',
      licensePlate: '',
      type: '',
      make: '',
      model: '',
      year: date.getFullYear(),
      size: 'motorcycle',
      color: ''
    });
    const { image, licensePlate, type, make, model, year, size, color } = vehicle;
  
    const [validated, setValidated] = useState(false);
  
    const [tempImage, setTempImage] = useState('');
    const [imageFile, setImageFile] = useState('');
  
    const handleFileChange = (e) => {
      console.log(e.target.files);
      let img = '';
      if (edit) {
        img = image;
      }
      let tempFile = e.target.files[0];
      img = URL.createObjectURL(tempFile);
      setTempImage(img);
      setImageFile(tempFile);
    };
  
    const handleRemoveImage = () => {
      setTempImage('');
      setImageFile('');
    };
  
    const onChangeVehicle = (event) => {
      setVehicle({ ...vehicle, [event.target.name]: event.target.value });
    };
  
    for (var i = new Date().getFullYear(); i >= new Date().getFullYear() - 20; i--) {
      years.push(i);
    }
  
    const saveImage = async () => {
      if (!tempImage) return '';
      let file = imageFile;
      let fileName = 'vehicle-image';
      let extension = 'jpg';
      // let extension = file.name.split('.')[1].toLowerCase();
      let { type: mimeType } = file;
      let key = `images/${uuid()}${fileName}.${extension}`;
      let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
  
      await Storage.put(key, file, {
        contentType: mimeType
      });
  
      return url;
    };
  
    const onSubmitHandler = async () => {
      try {
        // if(activeIndex!=9){
        if (licensePlate && type && make && model && year && size) {
          // setActiveIndex(activeIndex+1);
          // setProgress(progress+13);
          if (edit) {
            handleUpdate({
              ...vehicle,
              image: await saveImage(),
              id: id,
              userId: userId,
              profileType: profileType
            });
          } else {
            handleSave({
              ...vehicle,
              image: await saveImage(),
              userId: userId,
              profileType: profileType
            });
          }
          // setActiveIndex(1);
          // setProgress(0);
          setVehicle({
            image: '',
            licensePlate: '',
            type: '',
            make: '',
            model: '',
            year: date.getFullYear(),
            size: 'motorcycle',
            color: ''
          });
  
          onCloseHandler();
          setValidated(false);
        } else {
          setValidated(true);
        }
      } catch (error) {
        alert('Problem adding vehicle', 'Please try again');
        console.log(error);
      }
    };
export function useCRUDPropertyType(id) {
    const { data, loading, error } = useQuery(GET_VEHICLE, { variables: { id } });
    const [addVehicle] = useMutation(AddVehicleModal);
    const [disabled, updateDisabled] = useState(false);
    const [payload, setPayload] = useState({
        index: 0,
        options: []
      });
    const [oneData, setOneData] = useState({ options: [] });
    // const [form, setForm] = useState({ form: false, edit: false });
    const userId = useSelector(({ auth }) => (auth.authenticated ? auth.data.attributes.sub : null));
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(edit, id);
        if (edit && id) {
          const getVehicleData = () => {
            // let vehicleData =  vehicles.filter((item)=>item._id===id)[0];
            // const {licensePlate,type,make,model,year,size,image} = vehicleData;
            // setVehicle({licensePlate:licensePlate,type:type,make:make,model:model,year:year,size:size,image:image});
            // setTempImage(image);
    
            client
              .query({ query: GET_VEHICLE, variables: { id: id } })
              .then(({ data }) => {
                if (data.getVehicle) {
                  const { licensePlate, type, make, model, year, size, image } = data.getVehicle;
                  console.log('image :', image);
                  setVehicle({
                    licensePlate: licensePlate,
                    type: type,
                    make: make,
                    model: model,
                    year: year,
                    size: size,
                    image: image
                  });
                  setTempImage(image);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          };
          getVehicleData();
        } else {
          // setActiveIndex(1);
          // setProgress(0);
          setVehicle({
            image: '',
            licensePlate: '',
            type: '',
            make: '',
            model: '',
            year: date.getFullYear(),
            size: 'motorcycle',
            color: ''
          });
        }
      }, [edit, id]);
    return {
        data,
        handleUpdate,
        handleFileChange,
        handleRemoveImage,
        onChangeVehicle,
        saveImage,
        onSubmitHandler,
        handleSave,
        setVehicle,





    };
}

}