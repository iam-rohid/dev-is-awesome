import React from "react";

const Newsletter = () => {
  return (
    <div className="bg-primary-600 text-gray-50 dark:text-gray-50">
      <div className="py-16 max-w-4xl mx-auto px-4 w-full">
        <h3 className="text-2xl font-bold text-center mb-2">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-center text-primary-200 mb-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          voluptates dicta possimus voluptas mollitia amet!
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email here"
              className="px-4 h-12 rounded-md sm:flex-1 text-lg placeholder:text-primary-400 bg-primary-700 outline-none border-none focus:ring-2 ring-primary-400 selection:bg-primary-500"
            />
            <button
              type="submit"
              className="text-lg h-12 flex items-center justify-center px-4 bg-white text-gray-900 rounded-md font-medium"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
