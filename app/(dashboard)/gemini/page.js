import React from 'react';
import { UserIcon, FileQuestionIcon, SendIcon } from 'lucide-react';
function page(props) {
    
    return (
        <div className='flex flex-col min-h-screen section-p'>
            <div className='flex items-center p-[20px] gap-5'>
                <UserIcon className='text-[#616d8a]'/>
                <p className='text-lg'>Gemini</p>
            </div>
            <div>
                <div className='flex flex-col items-center justify-center p-[20px]'>
                    <h1 className='text-4xl'><span>Welcome</span></h1>
                    <p className='text-2xl'>How can i help you today?</p>
                </div>
                <div className='grid grid-cols-4 gap-[15px] p-[20px]'>                
                    <div className='card'>
                        <p>Suggest how can i be more ecofriendly in my daily life.</p>
                        <FileQuestionIcon/>
                    </div>
                    <div className='card'>
                        <p>Suggest how can i be more ecofriendly in my daily life.</p>
                        <FileQuestionIcon/>
                    </div>
                    <div className='card'>
                        <p>Suggest how can i be more ecofriendly in my daily life.</p>
                        <FileQuestionIcon/>
                    </div>
                    <div className='card'>
                        <p>Suggest how can i be more ecofriendly in my daily life.</p>
                        <FileQuestionIcon/>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex'>
                    <input type="text" className='bg-[#F0F1F3]' placeholder="Enter prompt here"/>
                    <div>
                        <SendIcon/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
