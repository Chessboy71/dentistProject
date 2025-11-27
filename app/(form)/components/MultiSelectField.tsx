import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

const MultiSelectField = ({
  field,
  label,
  options,
  description,
}: {
  field: any;
  label: string;
  options: { value: string; label: string }[];
  description?: string;
}) => {
  return (
    <FormItem>
      <FormLabel className="text-xs font-semibold text-slate-500">
        {label}
      </FormLabel>
      {description && (
        <FormDescription className="text-xs font-normal">
          {description}
        </FormDescription>
      )}

      <MultiSelect onValuesChange={field.onChange} values={field.value}>
        <FormControl>
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue
              placeholder={`Choisissez un ${label.toLowerCase()}`}
            />
          </MultiSelectTrigger>
        </FormControl>
        <MultiSelectContent>
          <MultiSelectGroup>
            {options.map((option) => (
              <MultiSelectItem key={option.value} value={option.value}>
                {option.label}
              </MultiSelectItem>
            ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
      <FormMessage />
    </FormItem>
  );
};

export default MultiSelectField;
