import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("PUBLISHABLE_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated.");
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from("Profiles")
      .select("profile_image")
      .eq("id", user.id)
      .maybeSingle();
    if (profileError) throw profileError;

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SERVICE_ROLE_KEY") ?? "",
    );

    if (profile?.profile_image) {
      const { data: avatar_deletion, error: avatar_error } =
        await supabaseAdmin.storage
          .from("Profile-Images")
          .remove([profile.profile_image]);
      if (avatar_error) throw avatar_error;
      console.log(
        "Avatar deleted: " + JSON.stringify(avatar_deletion, null, 2),
      );
    }

    const { error: deleteProfileError } = await supabaseAdmin
      .from("Profiles")
      .delete()
      .eq("id", user.id);

    if (deleteProfileError) throw deleteProfileError;
    const { data: deletion_data, error: deletion_error } =
      await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deletion_error) throw deletion_error;
    console.log("User & files deleted user_id: " + user.id);
    return Response.json(
      { message: "User deleted!" },
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete user";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});