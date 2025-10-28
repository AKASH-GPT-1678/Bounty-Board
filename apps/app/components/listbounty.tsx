"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
enum Category {
    Development = "Development",
    Design = "Design",
    Writing = "Writing",
    Marketing = "Marketing",
    Research = "Research",
}

// 🧩 Zod Schema
const bountySchema = z.object({
    _title: z.string().min(3, "Title must be at least 3 characters"),
    _description: z.string().min(10, "Description must be at least 10 characters"),
    _expectation: z.string().min(5, "Expectation is required"),
    imageUrl: z.string().url("Must be a valid image URL"),
    _category: z.nativeEnum(Category, { message: "Select a valid category" }),
    _deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Deadline must be a valid date",
    }),
    _bountyAmount: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Enter a valid positive bounty amount"),
});

type BountyFormData = z.infer<typeof bountySchema>;

export default function BountyForm({ onSubmit }: { onSubmit?: (data: BountyFormData) => void }) {
    const [submitButton, setSubmitButton] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BountyFormData>({
        resolver: zodResolver(bountySchema),
    });

    const submitForm = (data: BountyFormData) => {
        setSubmitButton(!submitButton);
        const formattedData = {
            ...data,
            _deadline: new Date(data._deadline).getTime(), // convert to timestamp
            _bountyAmount: Number(data._bountyAmount),
        };

        console.log("✅ Final Form Data:", formattedData);

    };

    React.useEffect(() => {
        console.log("Form Errors:", errors);
        if (errors) {
            toast.error("Please fill in all the fields correctly.");

        }
    }, [submitButton, errors]);

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New Bounty</h2>

            <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        {...register("_title")}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter bounty title"
                    />
                    {errors._title && <p className="text-red-500 text-sm mt-1">{errors._title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        {...register("_description")}
                        className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Describe the bounty..."
                    />
                    {errors._description && (
                        <p className="text-red-500 text-sm mt-1">{errors._description.message}</p>
                    )}
                </div>

                {/* Expectation */}
                <div>
                    <label className="block text-sm font-medium mb-1">Expectation</label>
                    <textarea
                        {...register("_expectation")}
                        className="w-full border rounded-lg px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="What do you expect from participants?"
                    />
                    {errors._expectation && (
                        <p className="text-red-500 text-sm mt-1">{errors._expectation.message}</p>
                    )}
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="url"
                        {...register("imageUrl")}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="https://example.com/image.png"
                    />
                    {errors.imageUrl && (
                        <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        {...register("_category")}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Select a category</option>
                        {Object.values(Category).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors._category && (
                        <p className="text-red-500 text-sm mt-1">{errors._category.message}</p>
                    )}
                </div>

                {/* Deadline */}
                <div>
                    <label className="block text-sm font-medium mb-1">Deadline</label>
                    <input
                        type="date"
                        {...register("_deadline")}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors._deadline && (
                        <p className="text-red-500 text-sm mt-1">{errors._deadline.message}</p>
                    )}
                </div>

                {/* Bounty Amount */}
                <div>
                    <label className="block text-sm font-medium mb-1">Bounty Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("_bountyAmount")}
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter bounty amount"
                    />
                    {errors._bountyAmount && (
                        <p className="text-red-500 text-sm mt-1">{errors._bountyAmount.message}</p>
                    )}
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 transition"
                >
                    Create Bounty
                </button>
            </form>
        </div>
    );
}
