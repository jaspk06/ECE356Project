import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Nutrition } from '../types/Recipe'

const base: Nutrition = { calories: 2000, totalFat: 80, saturatedFat: 20, sodium: 2300, sugar: 1, protein: 1 }

export default function Modal(props: { nutrition: Nutrition }) {
    const { nutrition } = props;
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="flex justify-center px-4 pb-5">
                <button onClick={openModal} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Nutrition Information
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        <div className="p-1 border-2 border-black font-sans">
                                            <div className="text-4xl font-extrabold leading-none">Nutrition Facts</div>
                                            <div className="flex justify-between font-bold border-b-8 border-black" />
                                            <div className="flex justify-between items-end font-extrabold">
                                                <div>
                                                    <div className="font-bold">Amount per serving</div>
                                                    <div className="text-4xl">Calories</div>
                                                </div>
                                                <div className="text-5xl">{nutrition.calories * base.calories / 100}</div>
                                            </div>
                                            <div className="border-t-4 border-black text-sm pb-1">
                                                <div className="text-right font-bold pt-1 pb-1">% Daily value*</div>
                                                <hr className="border-gray-500" />
                                                <div className="flex justify-between">
                                                    <div>
                                                        <span className="font-bold">Total Fat</span> {nutrition.totalFat * base.totalFat / 100 + "g"}
                                                    </div>
                                                    <div className="font-bold">{`${nutrition.totalFat}%`}</div>
                                                </div>
                                                <hr className="border-gray-500" />
                                                <div className="flex justify-between">
                                                    <div>{`Saturated Fat ${nutrition.saturatedFat * base.saturatedFat / 100}g`}</div>
                                                    <div className="font-bold">{`${nutrition.saturatedFat}%`}</div>
                                                </div>
                                                <hr className="border-gray-500" />
                                                <div className="flex justify-between">
                                                    <div>
                                                        <span className="font-bold">Sodium</span> {`${nutrition.sodium * base.sodium / 100}mg`}
                                                    </div>
                                                    <div className="font-bold">{`${nutrition.sodium}%`}</div>
                                                </div>
                                                <hr className="border-gray-500" />
                                                <div className="pl-4">
                                                    {`Total Sugar ${nutrition.sodium}g`}
                                                </div>
                                                <hr className="border-gray-500" />
                                                <div>
                                                    <span className="font-bold">Protein</span> {`${nutrition.protein}g`}
                                                </div>
                                            </div>
                                            <div className="border-t-4 border-black flex leading-none text-xs pt-2 pb-1">
                                                <div className="pr-1">*</div>
                                                <div>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</div>
                                            </div>
                                        </div>
                                    </p>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button onClick={closeModal} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}