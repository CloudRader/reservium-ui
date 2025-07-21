
export const ErrorMobileModal = ({onClose, message, tittle = "Oops" }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                <h2 className="text-xl font-bold mb-4">{tittle}</h2>
                <p className="mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    OK
                </button>
            </div>
        </div>
    );
};