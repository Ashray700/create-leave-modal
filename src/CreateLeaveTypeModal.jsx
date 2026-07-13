import React, { useState } from 'react';
import { X, CircleAlert, Info, ChevronDown, CornerUpRight, Banknote, FileText } from 'lucide-react';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`
      relative inline-flex h-7 w-16 items-center rounded-full
      border border-gray-300 bg-white shadow-sm
      transition-all duration-200
    `}
  >
    <span
      className={`
        inline-block h-5 w-5 rounded-full bg-gray-600
        transform transition-transform duration-200
        ${checked ? "translate-x-6" : "translate-x-1"}
      `}
    />
  </button>
);

function CreateLeaveTypeModal({ isOpen, onClose }) {
  

  const [formData, setFormData] = useState({
    leaveName: '',
    creditType: '',
    waitingPeriod: '',
    payUnused: false,
    carryForward: false,
    // advanceNotice: '',
    uploadDocs: false,
    specialCategory: ''
  });

  const [formnumData, setFormnumData] = useState({
    advanceNotice: '',

  })

  const handletextchanges= (e)=> {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handlenumchanges= (e)=> {
    const numberonly= e.target.value.replace(/[^0-9,-]/g, "");
    setFormnumData({...formnumData, [e.target.name]:numberonly})
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center bg-gray-900/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        <div className= "flex justify-between items-center top-0 bg-white border-b border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900!">Create a new Leave Type</h2>
          <button onClick={onClose} className= "text-gray-900 cursor-pointer hover:text-gray-400 transition-colors">
            <X size= {30}/>
          </button>
          

        </div>
        <div className="p-6 space-y-8 text-left">

          <div>
            <h3 className= "text-gray-900 font-bold items-end text-sm mb-1">Basic Details</h3>
            <p className= "text-sm text-gray-700 mb-4">
              Provide the basic information for this leave type.
            </p>
            <hr className="w-full border-t border-gray-400 my-6" />
            <input 
            type="text"
            name= "leaveName"
            placeholder="Leave name"
            className="placeholder:text-gray-700 w-full p-3 bg-[#F6F6F8] text-[#CACACA] rounded text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            value= {formData.leaveName}
            onChange={handletextchanges}
            />
          </div>
          <div>
              <h3 className= "text-gray-900 font-bold text-sm mb-1">Accrual and Eligibility</h3>
              <p className= "text-sm text-gray-700 mb-4">
                Define how employees earn this leave and when they can start using it.
              </p>
              <hr className="w-full border-t border-gray-400 my-6" />
              <label className= "text-sm text-gray-700 mb-1 block">
                How is leave credited?
              </label>
              <div className="relative mb-4">

                <select
                className="text-gray-700 w-full p-3 bg-[#F6F6F8] rounded text-sm focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
                value={formData.creditType}
                name= "creditType"
                onChange= {handletextchanges}
                >
                  <option value="">Choose how leave balance is added for employees</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 text-gray-400" size={18} />  
              </div>
              <div className="bg-[#E4F6E9] p-3 rounded-md flex items-start gap-2 mb-4">
              <CircleAlert size={20} className="fill-teal-500 text-white mt-0.5 shrink-0" />
              <p className="text-sm text-gray-700">Sets weather the full balance appear on day one or build up gradually</p>
              </div>

              <label className= "text-sm text-gray-700 mb-1 block">
                Eligibility waiting period
              </label>
              <div className="relative mb-4">

                <select
                className="text-gray-700 w-full p-3 bg-[#F6F6F8] rounded text-sm focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
                value={formData.waitingPeriod}
                name= "waitingPeriod"
                onChange={handletextchanges}
                >
                  <option value="">When can employees start using this leave?</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 text-gray-400" size={18} />
              </div> 
          </div>
          <div>
            <h3 className= "text-gray-900 font-bold text-sm mb-1">Carry Forward and Encashment</h3>
            <p className= "text-sm text-gray-700 mb-4">
              Choose what happens to the unused leaves at the end of the leave cycle.
            </p>
            <hr className="w-full border-t border-gray-400 my-6" />

            <div className="space-y-4">
              <div className="flex text-gray-700 items-center justify-between">
                <div className="flex items-center gap-3 ">
                    <div className= "h-10 w-10 rounded-lg bg-[#E4F6E9] flex items-center justify-center">
                        <Banknote size={20} className="text-teal-600" strokeWidth={2}/>
                    </div>
                  <span className="text-sm">Allow employees to receive payment for unused leave.</span>
                </div>
                <Toggle checked={formData.payUnused} onChange={() => setFormData({...formData, payUnused: !formData.payUnused})} />
              </div>
              <div className="flex text-gray-700 items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className= "h-10 w-10 rounded-lg bg-[#E4F6E9] flex items-center justify-center">
                        <CornerUpRight size={20} className="text-teal-600" strokeWidth={2} />
                    </div>
                  <span className="text-sm">Allow unused leave to be carried over to the next leave cycle.</span>
                </div>
                <Toggle checked={formData.carryForward} onChange={() => setFormData({...formData, carryForward: !formData.carryForward})} />
              </div>
            </div>
          </div>
          <div>
            <h3 className= "text-gray-900 font-bold text-sm mb-1">Application Rules</h3>
            <p className= "text-sm text-gray-700 mb-4">
              Control when and how employees can apply for this leave.
            </p>
            <hr className="w-full border-t border-gray-400 my-6" />
            <div className="space-y-4">
                `<label className= "text-sm text-gray-700 mb-1 block">
                Enter minimum advance notice to apply for this leave (in days)

                </label>
                <input 
                type="text"
                name= "advanceNotice"
                placeholder="eg. 5"
                className="placeholder:text-gray-700 w-full p-3 bg-[#F6F6F8] rounded text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                value= {formnumData.advanceNotice}
                onChange={handlenumchanges}
                />
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className= "h-10 w-10 rounded-lg bg-[#E4F6E9] flex items-center justify-center">
                        <FileText size={20} className="text-teal-600" strokeWidth={2}/>
                    </div>
                    <span className="text-sm text-gray-700">Require employees to upload supporting documents while applying.</span>
                    </div>
                    <Toggle checked={formData.uploadDocs} onChange={() => setFormData({...formData, uploadDocs: !formData.uploadDocs})} />
                </div>`
            </div>
          </div> 

            <div>
              <h3 className= "text-gray-900 font-bold text-sm mb-1">Special Leave Configuration</h3>
              <p className= "text-sm text-gray-700 mb-4">
                Configure additional rules for special leave categories
              </p>
              <hr className="w-full border-t border-gray-400 my-6" />

              <div className="relative mb-4">

                <select
                className="text-gray-700 w-full p-3 bg-[#F6F6F8] rounded text-sm focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
                value={formData.specialCategory}
                name= "specialCategory"
                onChange= {handletextchanges}
                >
                  <option value="">Maternity Leave</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 text-gray-400" size={18} />  

                 <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">

                    <div className="flex relative items-center gap-2">
                        <label className="text-sm text-gray-600">
                        Biological
                        </label>

                        <select className="text-gray-700 w-28 h-10 px-3 bg-[#F6F6F8] rounded-md text-sm appearance-none pr-10 ">
                        <option>6 Months</option>
                        <option>9 Months</option>
                        <option>12 Months</option>
                        </select>
                        <ChevronDown
                            size={16}
                            strokeWidth={1.75}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            />
                    </div>

                    <div className="flex relative items-center gap-2">
                        <label className="text-sm text-gray-600">
                        Adoption
                        </label>

                        <select className="text-gray-700 w-28 h-10 px-3 bg-[#F6F6F8] rounded-md text-sm appearance-none pr-10">
                        <option>3 Months</option>
                        <option>6 Months</option>
                        </select>
                        <ChevronDown
                            size={16}
                            strokeWidth={1.75}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            />
                    </div>

                </div>
                                
              </div>
            </div> 

            <div className="flex justify-center items-center gap-3 pt-4">
              <button className= "w-44 h-11 text-[#7FDDBE] border-[#7FDDBE] border px-4 py-2 rounded text-sm font-medium hover:bg-[#7FDDBE] hover:text-white transition-colors">
                Save to Draft
              </button>
              <button className= "w-44 h-11 bg-[#00BC7E] text-white px-4 py-2 rounded text-sm font-medium hover:bg-teal-700 transition-colors">
                Create Leave Type
              </button>
            </div>"
        </div>  
      </div>
    </div>
    
  );
}

export default CreateLeaveTypeModal;