import { SupabaseClient } from "@supabase/supabase-js";

export const fetchSingleRow = async (
  rows: string,
  supabase: SupabaseClient,
  setRow: React.Dispatch<React.SetStateAction<object | null>>,
  rowId: string,
) => {
  if (!rowId) return;
  const { data, error } = await supabase
    .from(rows)
    .select("*")
    .eq("id", rowId)
    .single();
  if (error) {
    console.error("Error fetching single row from", rows, error);
  } else {
    setRow(data);
  }
};

export const fetchRows = async (
  rows: string,
  supabase: SupabaseClient,
  setRows: React.Dispatch<React.SetStateAction<object[]>>,
) => {
  const { data, error } = await supabase
    .from(rows)
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Error fetching all rows from", rows, error);
  } else {
    setRows(data);
  }
};

export const fetchSpecificRows = async (
  rows: string,
  supabase: SupabaseClient,
  setRows: React.Dispatch<React.SetStateAction<object[]>>,
  foreignId: string,
  rowId: string,
) => {
  const { data, error } = await supabase
    .from(rows)
    .select("*")
    .eq(foreignId, rowId)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Error fetching specific rows from", rows, error);
  } else {
    setRows(data);
  }
};

export const updateRow = async (
  rows: string,
  rowId: string,
  supabase: SupabaseClient,
  updateObject: object,
) => {
  const { error } = await supabase
    .from(rows)
    .update(updateObject)
    .eq("id", rowId);

  if (error) {
    console.error(rows, "Error updating row:", error);
  } else {
    console.log(rows, "updated!");
  }
};

export const deleteRow = async (
  rows: string,
  rowId: string,
  supabase: SupabaseClient,
) => {
  const { error } = await supabase
    .from(rows)
    .delete()
    .match({ id: rowId })
    .single();
  if (error) {
    console.error("Error deleting row", rows, error);
  }
};

export const deleteRows = async (
  rows: string,
  rowId: string,
  supabase: SupabaseClient,
) => {
  const { error } = await supabase
    .from(rows)
    .delete()
    .match({ id: rowId })
    .single();
  if (error) {
    console.error("Error deleting rows", rows, error);
  }
};

export const insertRow = async (
  rows: string,
  supabase: SupabaseClient,
  insertObject: object,
  setRows: React.Dispatch<React.SetStateAction<object[]>>,
) => {
  const { data, error } = await supabase.from(rows).insert(insertObject);
  if (error) {
    console.error("Error adding", rows, error);
  } else if (data) {
    setRows((prev) => [...prev, ...data]);
    return data;
  }
};
