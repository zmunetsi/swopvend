"use client";

import { useState } from "react";
import Head from "next/head";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { changePassword, deactivateAccount, deleteAccount } from "@/services/accountService";

export default function AccountSecurityPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Change Password
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Danger Zone
  const [dangerLoading, setDangerLoading] = useState(false);

  // Handlers
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    setPasswordError("");
    setPasswordSuccess("");
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordError("");
    setPasswordSuccess("");
    if (passwordForm.new_password1 !== passwordForm.new_password2) {
      setPasswordError("Passwords do not match.");
      setPasswordSaving(false);
      return;
    }
    if (passwordForm.new_password1.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setPasswordSaving(false);
      return;
    }
    try {
      await changePassword({
        old_password: passwordForm.old_password,
        new_password1: passwordForm.new_password1,
        new_password2: passwordForm.new_password2,
      });
      setPasswordSuccess("Password updated successfully!");
      setPasswordForm({
        old_password: "",
        new_password1: "",
        new_password2: "",
      });
    } catch (err) {
      setPasswordError(
        err?.response?.data?.detail ||
          err?.response?.data?.old_password?.[0] ||
          err?.response?.data?.new_password1?.[0] ||
          err?.response?.data?.new_password2?.[0] ||
          "Failed to update password."
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleDeactivate = async () => {
    setDangerLoading(true);
    try {
      await deactivateAccount();
      alert("Account deactivated.");
      // Optionally, redirect or log out user
    } catch (err) {
      alert(
        err?.response?.data?.detail || "Failed to deactivate account."
      );
    }
    setDangerLoading(false);
  };

  const handleDelete = async () => {
    setDangerLoading(true);
    try {
      await deleteAccount();
      alert("Account deleted.");
      // Optionally, redirect or log out user
    } catch (err) {
      alert(
        err?.response?.data?.detail || "Failed to delete account."
      );
    }
    setDangerLoading(false);
  };

  return (
    <>
      <Head>
        <title>Security Settings | SwopVend</title>
        <meta name="description" content="Manage your SwopVend account security, password, and account removal." />
      </Head>
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Security Settings</h1>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Change Password">
            <form onSubmit={handlePasswordSave} className="bg-white p-5 rounded-lg shadow-2 flex flex-column gap-4">
              <div>
                <label htmlFor="current_password" className="block mb-2 font-medium">Current Password</label>
                <Password
                  id="current_password"
                  name="current_password"
                  value={passwordForm.current_password}
                  onChange={handlePasswordChange}
                  className="w-full"
                  feedback={false}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label htmlFor="new_password1" className="block mb-2 font-medium">New Password</label>
                <Password
                  id="new_password1"
                  name="new_password1"
                  value={passwordForm.new_password1}
                  onChange={handlePasswordChange}
                  className="w-full"
                  feedback={false}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="new_password2" className="block mb-2 font-medium">Confirm New Password</label>
                <Password
                  id="new_password2"
                  name="new_password2"
                  value={passwordForm.new_password2}
                  onChange={handlePasswordChange}
                  className="w-full"
                  feedback={false}
                  autoComplete="new-password"
                />
              </div>
              {passwordError && <div className="p-error mb-2">{passwordError}</div>}
              {passwordSuccess && <div className="p-success mb-2">{passwordSuccess}</div>}
              <Button
                type="submit"
                label={passwordSaving ? "Saving..." : "Change Password"}
                className="swop-button-primary mt-4"
                loading={passwordSaving}
                disabled={passwordSaving}
              />
            </form>
          </TabPanel>
          <TabPanel header="Danger Zone">
            <div className="bg-white p-5 rounded-lg shadow-2 flex flex-column gap-4">
              <div className="font-bold text-red-600 mb-2">Deactivate Account</div>
              <div className="text-600 mb-2">Temporarily disable your account. You can reactivate anytime by logging in.</div>
              <Button
                label="Deactivate Account"
                className="p-button-warning"
                onClick={handleDeactivate}
                loading={dangerLoading}
                disabled={dangerLoading}
              />
              <div className="font-bold text-red-700 mt-6 mb-2">Delete Account</div>
              <div className="text-600 mb-2">Permanently delete your account and all data. This action cannot be undone.</div>
              <Button
                label="Delete Account"
                className="p-button-danger"
                onClick={handleDelete}
                loading={dangerLoading}
                disabled={dangerLoading}
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
}