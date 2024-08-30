import React, { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import '../../styles/Dashboard.css';
import { AuthContext } from '../../context/ConfigContext';
import { API } from '../../utility/api';

const DashDefault = () => {
  const { setProduct } = useContext(AuthContext);
  const formRef = useRef(null);


  const [productDetails, setProductDetails] = useState({
    fullName: '',
    mobileNo: '',
    email: '',
    completeAddress: '',
    pincode: '',
    state: '',
    city: '',
    landmark: '',
    orderId: '',
    orderDate: '',
    paymentMode: '',
    productName: '',
    category: '',
    quantity: '',
    orderValue: '',
    hsn: '',
    physicalWeight: '',
    length: '',
    breadth: '',
    height: '',
    courierservices: '',
    amount: ''
  });

  // const handleChange = (e) => {
  //   setProductDetails({ ...productDetails, [e.target.name]: e.target.value });

  //   console.log(e.target.value)
  // };


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(e.target.value)

  //   // Handle pincode change separately
  //   if (name === 'pincode') {
  //     setProductDetails(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //     fetchLocation(value);
  //     if (value.length < 6) {
  //       setLocation([]);
  //       setAaa({});
  //       setProductDetails(prev => ({
  //         ...prev,
  //         state: '',
  //         city: ''
  //       }));
  //     }
  //   } else {
  //     // Handle other fields
  //     setProductDetails(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   }
  // };




  // const handleChange = (e) => {
  //   setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  //   console.log(e.target.value);

  //   // Convert date input from 'DD-MM-YYYY' to 'YYYY-MM-DD' format if necessary
  //   if (e.target.name === 'orderDate') {
  //     const [day, month, year] = e.target.value.split('-');
  //     const formattedDate = `${year}-${month}-${day}`;
  //     setProductDetails(prev => ({
  //       ...prev,
  //       [e.target.name]: formattedDate
  //     }));
  //   } else {
  //     setProductDetails(prev => ({
  //       ...prev,
  //       [e.target.name]: e.target.value
  //     }));
  //   }

  //   // If the pincode changes manually, reset the location state
  //   if (e.target.name === 'pincode') {

  //     if (e.target.value.length === 6) {
  //       fetchLocation()
  //     } else {
  //       setLocation([]);

  //       setProductDetails(prev => ({
  //         ...prev,
  //         state: '',
  //         city: '',
  //         completeAddress: ''
  //       }));
  //     }
  //   }
  // };






  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setProductDetails(prev => ({
      ...prev,
      [name]: value
    }));

    // Special handling for date
    if (name === 'orderDate') {
      const [day, month, year] = value.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      setProductDetails(prev => ({
        ...prev,
        [name]: formattedDate
      }));
    }

    if (name === 'pincode' && value.length === 6) {
      fetchLocation(value);
    } else if (name === 'pincode' && value.length < 6) {
      setLocation([]);
      setProductDetails(prev => ({
        ...prev,
        state: '',
        city: ''
      }));
    }

  };


  // Submit button for Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that all required fields have valid data before submission
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const res = await fetch(`${API}/productorderdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productDetails),
        credentials: 'include'
      });

      const resData = await res.json();
      if (res.status === 201) {
        setProductDetails(resData);
        setProduct(resData);
        toast.success('Product Created Successfully');
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error', error);
    }
  };



  const validateForm = () => {
    const requiredFields = [
      'fullName', 'mobileNo', 'email', 'completeAddress', 'pincode',
      'state', 'city', 'orderId', 'orderDate', 'paymentMode',
      'productName', 'quantity', 'orderValue', 'hsn', 'physicalWeight',
      'length', 'breadth', 'height', 'courierservices', 'amount'
    ];

    return requiredFields.every(field => productDetails[field] && productDetails[field].trim() !== '');
  };


  // PDF Generate Form
  const generatePDF = ({
    fullName,
    email,
    mobileNo,
    completeAddress,
    pincode,
    state,
    city,
    landmark,
    orderId,
    orderDate,
    paymentMode,
    productName,
    quantity,
    orderValue,
    hsn,
    physicalWeight,
    breadth,
    height,
    courierservices,
    amount
  }) => {
    const doc = new jsPDF();
    let y = 10;

    // Set title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Order Details", 10, y);
    y += 15;

    // Set subtitle
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Personal Information", 10, y);
    y += 10;

    // Define the data entries
    const data = {
      fullName,
      email,
      mobileNo,
      completeAddress,
      pincode,
      state,
      city,
      landmark,
      orderId,
      orderDate,
      paymentMode,
      productName,
      quantity,
      orderValue,
      hsn,
      physicalWeight,
      breadth,
      height,
      courierservices,
      amount
    };

    // Add personal info with styling
    Object.entries(data).forEach(([label, value]) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`${label.charAt(0).toUpperCase() + label.slice(1)}:`, 10, y);
      doc.setFont("helvetica", "italic");
      doc.text(value, 60, y);
      y += 10;
    });

    // Add order info header
    y += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Order Information", 10, y);
    y += 10;

    // Define the order entries
    const orderData = {
      orderId,
      orderDate,
      paymentMode,
      productName,
      quantity,
      orderValue,
      hsn,
      physicalWeight,
      breadth,
      height,
      courierservices,
      amount
    };

    // Add order info with styling
    Object.entries(orderData).forEach(([label, value]) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`${label.charAt(0).toUpperCase() + label.slice(1)}:`, 10, y);
      doc.setFont("helvetica", "italic");
      doc.text(value, 60, y);
      y += 10;
    });

    // Add a footer
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Generated by Your Company", 10, y);

    doc.save('form-data.pdf');
  };

  const handleSubmitPdf = () => {
    const requiredFields = [
      'fullName', 'mobileNo', 'email', 'completeAddress', 'pincode',
      'state', 'city', 'landmark', 'orderId', 'orderDate', 'paymentMode',
      'productName', 'quantity', 'orderValue', 'hsn', 'physicalWeight',
      'breadth', 'height', 'courierservices', 'amount'
    ];

    if (requiredFields.every(field => productDetails[field] !== '')) {
      generatePDF(productDetails);
    } else {
      console.error('Some required fields are missing or empty.');
    }
  };




  // Fetch Location according to Pincode
  const [location, setLocation] = useState([]);
  const [aaa, setAaa] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const fetchLocation = async (pincode) => {
    // const pincode = e.target.value;

    // const pincode = productDetails.pincode;
    try {
      if (pincode.length === 6) {
        setIsLoadingLocation(true);
        const url = `${API}/getlocation/${pincode}`;
        const res = await fetch(url);

        if (!res.ok) {
          setProductDetails(prev => ({
            ...prev,
            state: prev.state,
            city: prev.city,
            pincode: prev.pincode
          }));
          return
        }
        const data = await res.json();
        console.log(data);

        if (res.ok && data) {
          setLocation(data.addresses);
          setAaa(data);

          // Update state and city only if they are not manually entered
          setProductDetails(prev => ({
            ...prev,
            state: prev.state || data.state,
            city: prev.city || data.city
          }));
        } else {
          setLocation([]);
          setAaa({});
          setProductDetails({ ...productDetails, state: '', city: '' });
        }
        setIsLoadingLocation(false);
      } else {
        setProductDetails({
          ...productDetails,
          state: '',
          city: ''
        });
      }
    } catch (error) {
      console.log("Error", error);
      setIsLoadingLocation(false);
      setProductDetails({ ...productDetails, state: '', city: '' });
    }
  }



  const handleLocationSelect = (e) => {
    const completeAddress = e.target.value;

    console.log(e.target.value)
    setProductDetails(prev => ({
      ...prev,
      completeAddress: completeAddress,
      state: aaa.state || productDetails.state,
      city: aaa.city || productDetails.city
    }));
  };



  return (
    <div className="container">
      <form ref={formRef}>
        <div className="card">
          <div className="card-header">
            <div>
              <span>1</span>
            </div>
            <div>
              <h1>Consignee Details</h1>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Customer Full Name</label>
              <input type="text" name="fullName" placeholder="Enter full name" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Mobile No</label>
              <input type="number" name="mobileNo" placeholder="Enter mobile no" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>2</span>
            <h1>Customer Address</h1>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Complete Address</label>

              {location.length > 0 && !isLoadingLocation ? (
                <select as="select" name="completeAddress" onChange={handleLocationSelect}>
                  <option>Select Address...</option>
                  {location.map((loc, index) => (
                    <option key={loc._id} value={loc.locationName}>
                      {`${loc.locationName}`}
                    </option>
                  ))}
                </select>
              ) : (
                <input type="text" name='completeAddress' placeholder="Enter Address" onChange={handleChange} />
              )}

              {/* <input type="text" name='completeAddress' placeholder="Enter Address" onChange={handleChange} /> */}

            </div>
            <div className="form-group">
              <label>Pincode</label>
              {/* {
                location.length > 0 ? (
                  <input type="number" name="pincode" placeholder="Enter pincode" onChange={handleChange} onInput={fetchLocation} />
                ) : <input type="number" name="pincode" placeholder="Enter pincode" onChange={handleChange} />
              } */}
              <input type="number" name="pincode" placeholder="Enter pincode" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>State</label>

              {location.length > 0 && !isLoadingLocation ? (
                <input type="text" name="state" placeholder="Enter state" onChange={handleLocationSelect} value={aaa.state ? productDetails.state : ''} />
              ) : (
                <input type="text" name="state" placeholder="Enter state" onChange={handleChange} />
              )}


              {/* <input type="text" name="state" placeholder="Enter state" onChange={handleChange} /> */}
            </div>
            <div className="form-group">
              <label>City</label>
              {location.length > 0 && !isLoadingLocation ? (
                <input type="text" name="city" placeholder="Enter city" onChange={handleLocationSelect} value={aaa.city ? productDetails.city : ''} />
              ) : (
                <input type="text" name="city" placeholder="Enter city" onChange={handleChange} />
              )}


              {/* <input type="text" name="city" placeholder="Enter city" onChange={handleChange} /> */}
            </div>
            <div className="form-group">
              <label>Landmark</label>
              <input type="text" name="landmark" placeholder="Enter landmark" onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>3</span>
            <h1>Order Details</h1>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Order ID</label>
              <input type="text" name="orderId" placeholder="Enter Order ID" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Order Date</label>
              <input type="date" name="orderDate" placeholder="Enter Order Date" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Payment Mode</label>
              <select name="paymentMode" onChange={handleChange}>
                <option>select payment</option>
                <option value="cod">COD</option>
                <option value="prepaid">Prepaid</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>4</span>
            <h1>Product Details</h1>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" name="productName" placeholder="Enter Product Name" onChange={handleChange} />
            </div>
            <div className="form-group">
              {/* <label>Category</label>
              <input type="text" name="category" placeholder="Enter Category" onChange={handleChange} /> */}

              <label htmlFor="category">Category</label>
              <select name="category" id="" onChange={handleChange}>
                <option>select category</option>
                <option value="accessories">Accessories</option>
                <option value="fashion and clothing">Fashion & Clothing</option>
                <option value="accessories">Beauty and & Stationary</option>
                <option value="electronics">Electronics</option>
                <option value="fmcg">FMCG</option>
                <option value="footwear">Footwear</option>
                <option value="toys">Toys</option>
                <option value="sports equipment">Sports Equipment</option>
                <option value="others">Others</option>
                <option value="wellness">Wellness</option>
                <option value="medicines">Medicines</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" placeholder="Enter Quantity" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Order Value</label>
              <input type="number" name="orderValue" placeholder="Enter Order Value" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>HSN</label>
              <input type="text" name="hsn" placeholder="Enter HSN" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Physical Weight</label>
              <input type="text" name="physicalWeight" placeholder="Enter Physical Weight" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Length</label>
              <input type="number" name="length" placeholder="Enter Length" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Breadth</label>
              <input type="number" name="breadth" placeholder="Enter Breadth" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Height</label>
              <input type="number" name="height" placeholder="Enter Height" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Courier Services</label>
              <select name="courierservices" id="" onChange={handleChange}>
                <option>select courierservices</option>
                <option value="xpressbees">Xpressbees</option>
                <option value="dtdc">DTDC Courier Service.</option>
                <option value="delhivery">Delhivery</option>
                <option value="indiaPost">IndiaPost</option>
                <option value="bluedart">Blue Dart Express</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input type="number" name="amount" placeholder="Enter Amount" onChange={handleChange} />
            </div>
          </div>
        </div>

        <button className="btn" type="submit" onClick={handleSubmit}>Submit</button>
        <button className="btn" type="button" onClick={handleSubmitPdf}>Generate PDF</button>
      </form>
    </div>
  );
};

export default DashDefault;
