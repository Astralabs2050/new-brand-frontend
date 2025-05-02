"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from '../components/input'
import { Select, SelectOption } from '../components/select'
import Textarea from '../components/textArea'
import { CloudUpload  } from 'lucide-react'
import Button from '../components/button'

// Define form data interface
interface BrandFormValues {
  brandName: string;
  brandOrigin: string;
  brandStory: string;
  logo: File | null;
}

function BrandProfilePage(): any {
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Define validation schema
  const validationSchema = Yup.object({
    brandName: Yup.string()
      .required('Brand name is required')
      .min(2, 'Brand name must be at least 2 characters'),
    brandOrigin: Yup.string()
      .required('Brand origin is required'),
    brandStory: Yup.string(),
    logo: Yup.mixed()
      .test('fileType', 'Only JPEG/JPG files are accepted', 
        (value) => !value || (value instanceof File && ['image/jpeg', 'image/jpg'].includes(value.type)))
  });

  // Initialize formik
  const formik = useFormik<BrandFormValues>({
    initialValues: {
      brandName: '',
      brandOrigin: '',
      brandStory: '',
      logo: null
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      // Handle form submission logic here
    }
  });

  // Origin options for select
  const originOptions: SelectOption[] = [
    { label: 'USA', value: 'usa' },
    { label: 'Canada', value: 'canada' },
    { label: 'UK', value: 'uk' },
    { label: 'France', value: 'france' },
    { label: 'Italy', value: 'italy' },
    { label: 'Japan', value: 'japan' },
    { label: 'South Korea', value: 'south-korea' },
    { label: 'Other', value: 'other' },
  ];

  // Handle drag events for file upload
  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        formik.setFieldValue('logo', file);
      } else {
        formik.setFieldError('logo', 'Only JPEG/JPG files are accepted');
      }
    }
  };

  // Handle file selection via input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        formik.setFieldValue('logo', file);
      } else {
        formik.setFieldError('logo', 'Only JPEG/JPG files are accepted');
      }
    }
  };

  return (
    <div
      className="w-screen p-6 flex items-center justify-center"
      style={{
        backgroundImage: 'url("/loginBg.png")'
      }}
    >
      <div className="w-[516px] h-auto rounded-[16px] border border-[#000000] py-[24px] px-[40px] gap-[10px] flex flex-col items-center justify-center bg-white">
        <Image className="mb-2" src="/logo.png" alt="logo" width={155} height={37} />
        <h2 className="font-[500] text-[32px]">Brand Profile</h2>
        <p className="font-[400] text-[18px]">Showcase your unique fashion identity</p>
        
        <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
          <div>
            <Input 
              name="brandName"
              placeholder="Enter your brand name"
              value={formik.values.brandName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.brandName && formik.errors.brandName ? formik.errors.brandName : ''}
            />
          </div>
          
          <div>
            <Select
              name="brandOrigin"
              placeholder="Select your brand origin"
              options={originOptions}
              value={formik.values.brandOrigin}
              onChange={(value) => formik.setFieldValue('brandOrigin', value)}
              onBlur={() => formik.setFieldTouched('brandOrigin', true)}
              error={formik.touched.brandOrigin && formik.errors.brandOrigin ? formik.errors.brandOrigin : ''}
            />
          </div>
          
          <div>
            <Textarea
              name="brandStory"
              placeholder="Tell your brand story (optional, but good for marketing)"
              value={formik.values.brandStory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.brandStory && formik.errors.brandStory ? formik.errors.brandStory : ''}
              xb="someValue" // Replace 'someValue' with the appropriate value for the 'xb' prop
            />
          </div>
          
          <div className="flex mb-3 flex-col items-center w-full">
            <h2 className="text-[] font-[ClashGrotesk-Medium] font-medium mb-3 w-full text-left">Upload your Brand Logo</h2>
            <div
              className={`w-full h-44 mb-3 rounded-lg flex flex-col items-center justify-center bg-gray-50 ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } ${formik.touched.logo && formik.errors.logo ? "border-red-500" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formik.values.logo ? (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(formik.values.logo)}
                    alt="Brand logo preview"
                    className="max-h-40 max-w-full mb-2"
                  />
                  <p className="text-sm text-gray-500">{formik.values.logo.name}</p>
                </div>
              ) : (
                <>
                   <CloudUpload  size={32}  />
                  <p className="text-[14px] text-gray-500 mb-1">Drag and Drop JPEG File</p>
                  <p className="text-lg text-gray-500 mb-4">or</p>
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <div className="text-[14px] text-black underline">Upload from Device</div>
                    <input
                      id="fileUpload"
                      name="logo"
                      type="file"
                      accept="image/jpeg,image/jpg"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>
            {formik.touched.logo && formik.errors.logo && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.logo as string}</p>
            )}
            {formik.values.logo && (
              <button
                type="button"
                onClick={() => formik.setFieldValue('logo', null)}
                className="mt-4 text-red-500 hover:text-red-700"
              >
                Remove File
              </button>
            )}
          </div>
          
         <Button type='submit' label='Save Brand Profile'/>
        </form>
      </div>
    </div>
  );
}

export default BrandProfilePage;