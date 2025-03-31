import React, { ReactNode } from 'react';
import { UseFormReturn, SubmitHandler } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

type FormWrapperProps<T extends Record<string, any>> = {
	children?: ReactNode;
	onSubmit: SubmitHandler<T>;
	form: UseFormReturn<T>;
};

export const FormWrapper = <T extends Record<string, any>>({
	children,
	onSubmit,
	form,
}: FormWrapperProps<T>) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				{children}
			</form>
		</Form>
	)
}

export const FormInput = ({ label, placeholder, name }: { label: string; placeholder: string; name: string; }) => (
	<FormField
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Input placeholder={placeholder} {...field} />
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export const FormTextArea = ({ label, placeholder, name }: { label: string; placeholder: string; name: string; }) => (
	<FormField
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Textarea placeholder={placeholder} {...field} />
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export const FormRadioGroup = ({ label, options, name }: { label: string; options: readonly { value: string; label: string }[]; name: string; }) => (
	<FormField
		name={name}
		render={({ field }) => (
			<FormItem className="space-y-3">
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
						{options.map((option) => (
							<FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
								<FormControl>
									<RadioGroupItem value={option.value} />
								</FormControl>
								<FormLabel className="font-normal">{option.label}</FormLabel>
							</FormItem>
						))}
					</RadioGroup>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);

export const FormCheckboxGroup = ({ label, options, name }: { label: string; options: readonly { id: string; label: string }[]; name: string; }) => (
	<FormField
		name={name}
		render={() => (
			<FormItem>
				<div className="mb-4">
					<FormLabel className="text-base">{label}</FormLabel>
				</div>
				{options.map((item) => (
					<FormField
						key={item.id}
						name={name}
						render={({ field }) => (
							<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
								<FormControl>
									<Checkbox
										checked={field.value?.includes(item.id)}
										onCheckedChange={(checked) =>
											checked
												? field.onChange([...field.value, item.id])
												: field.onChange(field.value?.filter((value: string) => value !== item.id))
										}
									/>
								</FormControl>
								<FormLabel className="font-normal">{item.label}</FormLabel>
							</FormItem>
						)}
					/>
				))}
				<FormMessage />
			</FormItem>
		)}
	/>
);

export const FormSelect = ({ label, options, name, placeholder }: { label: string; options: readonly { value: string; label: string }[]; name: string; placeholder: string }) => (
	<FormField
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel>{label}</FormLabel>
				<Select onValueChange={field.onChange} value={field.value}>
					<FormControl>
						<SelectTrigger>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FormMessage />
			</FormItem>
		)}
	/>
);
