import { motion } from 'motion/react';
import { useState } from 'react';

import SectionHeading from '@/components/common/section-heading';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import BackButton from '@/components/common/back-button';

const PaymentOptionsPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;
    setSelectedOption(value);
  };

  const handleProceed = () => {
    if (!selectedOption) {
      alert('Please select a payment option.');
      return;
    }

    if (
      selectedOption === 'aamarPay' ||
      selectedOption === 'cashOnDelivery'
    ) {
      return toast.warning(
        'aamarPay Or cashOnDelivery Not implemented yet! please try with stripe',
      );
    }

    navigate(`/payment/stripe-payment`);
  };

  return (
    <div className="mt-[80px] flex min-h-screen justify-center bg-gray-50 sm:px-6 md:mt-0 md:py-12 lg:px-8">
      <div className="relative z-10 flex justify-center w-full">
        <motion.div
          className="relative w-full max-w-md p-1 bg-white rounded-lg shadow-lg md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <SectionHeading heading="Select Payment Option" />
          </div>

          <form className="space-y-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <input
                  id="stripe"
                  type="radio"
                  value="stripe"
                  checked={selectedOption === 'stripe'}
                  onChange={handleOptionChange}
                  className="w-4 h-4 text-green-700 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="stripe"
                  className="block ml-3 text-sm font-medium text-gray-800"
                >
                  Stripe
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="aamarPay"
                  type="radio"
                  value="aamarPay"
                  checked={selectedOption === 'aamarPay'}
                  onChange={handleOptionChange}
                  className="w-4 h-4 text-green-700 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="aamarPay"
                  className="block ml-3 text-sm font-medium text-gray-800"
                >
                  AAmarPay
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="cashOnDelivery"
                  type="radio"
                  value="cashOnDelivery"
                  checked={selectedOption === 'cashOnDelivery'}
                  onChange={handleOptionChange}
                  className="w-4 h-4 text-green-700 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="cashOnDelivery"
                  className="block ml-3 text-sm font-medium text-gray-800"
                >
                  Cash on Delivery
                </label>
              </div>
            </motion.div>

            <div className="mt-6">
              <Button
                type="button"
                className="w-full"
                onClick={handleProceed}
              >
                Proceed
              </Button>
            </div>
          </form>
          <div className="absolute left-5 top-5">
            <BackButton />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentOptionsPage;
