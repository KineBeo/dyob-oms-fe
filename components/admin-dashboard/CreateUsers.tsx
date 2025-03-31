import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, Plus, Upload, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { userService } from "@/utils/user/userApi";

enum UserClass {
    VIP = 'VIP',
    BASIC = 'BASIC'
}

// Breakpoints from config
const SCREEN_BREAKPOINTS = {
    mobile: {
        min: "100px",
        max: "550px",
    },
    tablet: {
        min: "550px",
        max: "750px",
    },
    "mini-laptop": {
        min: "750px",
        max: "874px",
    },
    laptop: {
        min: "874px",
        max: "1280px",
    },
    desktop: {
        min: "1280px",
    },
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
};

const CreateUsers = () => {
    const [users, setUsers] = useState([
        {
          id: Date.now(),
          fullname: "",
          phone_number: "",
          password_hash: "",
          user_class: "BASIC",
          role: "USER",
          referral_code_of_referrer: "",
          parent_phone_number: "",
          showAdvanced: false
        }
    ]);
      
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentViewport, setCurrentViewport] = useState("");
      
    // Check viewport size on resize
    React.useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            
            if (width < parseInt(SCREEN_BREAKPOINTS.mobile.max)) {
                setCurrentViewport("mobile");
            } else if (width < parseInt(SCREEN_BREAKPOINTS.tablet.max)) {
                setCurrentViewport("tablet");
            } else {
                setCurrentViewport("desktop");
            }
        };
        
        // Initial check
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Check if current viewport is mobile or tablet
    const isSmallScreen = currentViewport === "mobile" || currentViewport === "tablet";
      
    // Add empty user row
    const handleAddUser = () => {
        setUsers([
          ...users,
          {
            id: Date.now(),
            fullname: "",
            phone_number: "",
            password_hash: "",
            user_class: "BASIC",
            role: "USER",
            referral_code_of_referrer: "",
            parent_phone_number: "",
            showAdvanced: false
          }
        ]);
    };
      
    // Remove user at specific index
    const handleRemoveUser = (id: number) => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
    };
      
    // Update user field value
    const handleUserChange = (id: number, field: keyof typeof users[0], value: string) => {
        setUsers(users.map(user => 
          user.id === id ? { ...user, [field]: value } : user
        ));
    };
      
    // Toggle advanced options
    const toggleAdvanced = (id: number) => {
        setUsers(users.map(user => 
          user.id === id ? { ...user, showAdvanced: !user.showAdvanced } : user
        ));
    };
      
    // Form validation
    const validateForm = () => {
        for (const user of users) {
          if (!user.fullname.trim()) {
            setError("Họ tên không được để trống");
            return false;
          }
          
          if (!user.phone_number.trim()) {
            setError("Số điện thoại không được để trống");
            return false;
          }
          
          if (!user.password_hash.trim()) {
            setError("Mật khẩu không được để trống");
            return false;
          }

        }
        
        setError("");
        return true;
    };
      
    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setSuccess("");
        setError("");
        
        try {
          // Format data for API
          const formattedUsers = users.map(user => ({
            fullname: user.fullname,
            phone_number: user.phone_number,
            password_hash: user.password_hash,
            user_class: user.user_class,
            role: user.role,
            referral_code_of_referrer: user.referral_code_of_referrer || undefined,
            parent_phone_number: user.parent_phone_number || undefined
          }));
          
          const result = await userService.addUsers(formattedUsers);
          
          // Reset form after successful creation
          setUsers([
            {
              id: Date.now(),
              fullname: "",
              phone_number: "",
              password_hash: "",
              user_class: "BASIC",
              role: "USER",
              referral_code_of_referrer: "",
              parent_phone_number: "",
              showAdvanced: false
            }
          ]);
          
          setSuccess("Tạo người dùng thành công");
          
        } catch (error: any) {
          const response = error.response?.data;

          if (Array.isArray(response?.message)) {
              // If message is an array, join each line
              setError(
                response.message
                  .map((msg: string) =>
                    msg.replace(/users\.(\d+)\./, (_, num) => `Người dùng ${Number(num) + 1}: `)
                  )
                  .join("\n")
              );
          } else if (response?.failed && Array.isArray(response.failed)) {
              // If there is a `failed` field, translate error to Vietnamese
              const translatedMessages = response.failed.map((item: { user: { phone_number: any; }; }) => 
                  `Số điện thoại ${item.user.phone_number} đã được sử dụng.`
              );
          
              setError(translatedMessages.join("\n"));
          } else {
              setError(response?.message || "Có lỗi xảy ra khi tạo người dùng");
          }
        } finally {
          setIsSubmitting(false);
        }
    };
      
    // Generate parent phone options from existing entries
    const getParentPhoneOptions = (currentIndex: number) => {
        return users
          .slice(0, currentIndex)
          .map(user => user.phone_number)
          .filter(phone => phone.trim() !== "");
    };
    
    // Render mobile card view for each user
    const renderMobileUserCard = (user: any, index: number) => (
        <Card key={user.id} className="mb-4 overflow-hidden">
            <CardHeader className="px-4 py-3 bg-slate-50 flex flex-row items-center justify-between">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-2">
                        <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <CardTitle className="text-sm">Người dùng {index + 1}</CardTitle>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveUser(user.id)}
                    disabled={users.length === 1}
                    className="h-8 w-8"
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-3">
                <div>
                    <label className="text-sm font-medium block mb-1">Họ tên</label>
                    <Input
                        placeholder="Họ tên"
                        value={user.fullname}
                        onChange={(e) => handleUserChange(user.id, 'fullname', e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="text-sm font-medium block mb-1">Số điện thoại</label>
                    <Input
                        placeholder="Số điện thoại"
                        value={user.phone_number}
                        onChange={(e) => handleUserChange(user.id, 'phone_number', e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="text-sm font-medium block mb-1">Mật khẩu</label>
                    <Input
                        type="text"
                        placeholder="Mật khẩu"
                        value={user.password_hash}
                        onChange={(e) => handleUserChange(user.id, 'password_hash', e.target.value)}
                    />
                </div>
                
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleAdvanced(user.id)}
                    className="w-full"
                >
                    {user.showAdvanced ? 
                        <><ChevronUp className="h-4 w-4 mr-2" /> Ẩn tùy chọn</> : 
                        <><ChevronDown className="h-4 w-4 mr-2" /> Thêm tùy chọn</>
                    }
                </Button>
                
                {user.showAdvanced && (
                    <div className="space-y-3 mt-2 pt-2 border-t">
                        <div>
                            <label className="text-sm font-medium block mb-1">Loại người dùng</label>
                            <Select
                                value={user.user_class}
                                onValueChange={(value) => handleUserChange(user.id, 'user_class', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn loại" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(UserClass).map(cls => (
                                        <SelectItem key={cls} value={cls}>
                                            {cls}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium block mb-1">Mã giới thiệu</label>
                            <Input
                                placeholder="Mã giới thiệu (nếu có)"
                                value={user.referral_code_of_referrer}
                                onChange={(e) => handleUserChange(user.id, 'referral_code_of_referrer', e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium block mb-1">SĐT người dùng cha</label>
                            <div className="space-y-2">
                                <Input
                                    placeholder="SĐT người dùng cha (nếu có)"
                                    value={user.parent_phone_number}
                                    onChange={(e) => handleUserChange(user.id, 'parent_phone_number', e.target.value)}
                                />
                                
                                {getParentPhoneOptions(index).length > 0 && (
                                    <Select
                                        value=""
                                        onValueChange={(value) => {
                                            if (value) handleUserChange(user.id, 'parent_phone_number', value);
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn từ danh sách" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {getParentPhoneOptions(index).map(phone => (
                                                <SelectItem key={phone} value={phone}>
                                                    {phone}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
    
    // Render tablet view for each user - similar to mobile but with some adjustments
    const renderTabletUserCard = (user: any, index: number) => (
        <Card key={user.id} className="mb-4 overflow-hidden">
            <CardHeader className="px-4 py-3 bg-slate-50 flex flex-row items-center justify-between">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-2">
                        <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <CardTitle className="text-sm">Người dùng {index + 1}</CardTitle>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveUser(user.id)}
                    disabled={users.length === 1}
                    className="h-8 w-8"
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="px-4 py-3">
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label className="text-sm font-medium block mb-1">Họ tên</label>
                        <Input
                            placeholder="Họ tên"
                            value={user.fullname}
                            onChange={(e) => handleUserChange(user.id, 'fullname', e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium block mb-1">Số điện thoại</label>
                        <Input
                            placeholder="Số điện thoại"
                            value={user.phone_number}
                            onChange={(e) => handleUserChange(user.id, 'phone_number', e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label className="text-sm font-medium block mb-1">Mật khẩu</label>
                        <Input
                            type="text"
                            placeholder="Mật khẩu"
                            value={user.password_hash}
                            onChange={(e) => handleUserChange(user.id, 'password_hash', e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-end">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleAdvanced(user.id)}
                            className="w-full"
                        >
                            {user.showAdvanced ? 
                                <><ChevronUp className="h-4 w-4 mr-2" /> Ẩn tùy chọn</> : 
                                <><ChevronDown className="h-4 w-4 mr-2" /> Thêm tùy chọn</>
                            }
                        </Button>
                    </div>
                </div>
                
                {user.showAdvanced && (
                    <div className="space-y-3 mt-2 pt-2 border-t">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium block mb-1">Loại người dùng</label>
                                <Select
                                    value={user.user_class}
                                    onValueChange={(value) => handleUserChange(user.id, 'user_class', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn loại" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(UserClass).map(cls => (
                                            <SelectItem key={cls} value={cls}>
                                                {cls}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium block mb-1">Mã giới thiệu</label>
                                <Input
                                    placeholder="Mã giới thiệu (nếu có)"
                                    value={user.referral_code_of_referrer}
                                    onChange={(e) => handleUserChange(user.id, 'referral_code_of_referrer', e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium block mb-1">SĐT người dùng cha</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="SĐT người dùng cha (nếu có)"
                                    value={user.parent_phone_number}
                                    onChange={(e) => handleUserChange(user.id, 'parent_phone_number', e.target.value)}
                                    className="flex-1"
                                />
                                
                                {getParentPhoneOptions(index).length > 0 && (
                                    <Select
                                        value=""
                                        onValueChange={(value) => {
                                            if (value) handleUserChange(user.id, 'parent_phone_number', value);
                                        }}
                                    >
                                        <SelectTrigger className="w-[130px]">
                                            <SelectValue placeholder="Chọn từ danh sách" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {getParentPhoneOptions(index).map(phone => (
                                                <SelectItem key={phone} value={phone}>
                                                    {phone}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
    
    // Desktop table view for users
    const renderDesktopTableView = () => (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px] text-center">STT</TableHead>
                        <TableHead className="w-[220px]">Họ tên</TableHead>
                        <TableHead className="w-[180px]">Số điện thoại</TableHead>
                        <TableHead className="w-[180px]">Mật khẩu</TableHead>
                        <TableHead className="w-[120px]">Tùy chọn</TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index) => (
                        <React.Fragment key={user.id}>
                            <TableRow>
                                <TableCell className="text-center font-medium">
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Họ tên"
                                        value={user.fullname}
                                        onChange={(e) => handleUserChange(user.id, 'fullname', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Số điện thoại"
                                        value={user.phone_number}
                                        onChange={(e) => handleUserChange(user.id, 'phone_number', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder="Mật khẩu"
                                        value={user.password_hash}
                                        onChange={(e) => handleUserChange(user.id, 'password_hash', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => toggleAdvanced(user.id)}
                                    >
                                        {user.showAdvanced ? "Ẩn tùy chọn" : "Thêm tùy chọn"}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveUser(user.id)}
                                        disabled={users.length === 1}
                                    >
                                        <Trash className="h-4 w-4 text-red-700" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            
                            {user.showAdvanced && (
                                <TableRow className="bg-slate-50">
                                    <TableCell colSpan={6}>
                                        <div className="grid grid-cols-2 gap-4 py-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Loại người dùng</label>
                                                <Select
                                                    value={user.user_class}
                                                    onValueChange={(value) => handleUserChange(user.id, 'user_class', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn loại" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.values(UserClass).map(cls => (
                                                            <SelectItem key={cls} value={cls}>
                                                                {cls}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Mã giới thiệu</label>
                                                <Input
                                                    placeholder="Mã giới thiệu (nếu có)"
                                                    value={user.referral_code_of_referrer}
                                                    onChange={(e) => handleUserChange(user.id, 'referral_code_of_referrer', e.target.value)}
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">SĐT người dùng cha</label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="SĐT người dùng cha (nếu có)"
                                                        value={user.parent_phone_number}
                                                        onChange={(e) => handleUserChange(user.id, 'parent_phone_number', e.target.value)}
                                                        className="flex-1"
                                                    />
                                                    {getParentPhoneOptions(index).length > 0 && (
                                                        <Select
                                                            value=""
                                                            onValueChange={(value) => {
                                                                if (value) handleUserChange(user.id, 'parent_phone_number', value);
                                                            }}
                                                        >
                                                            <SelectTrigger className="w-[130px]">
                                                                <SelectValue placeholder="Chọn từ danh sách" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getParentPhoneOptions(index).map(phone => (
                                                                    <SelectItem key={phone} value={phone}>
                                                                        {phone}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
    
    // Render appropriate view based on viewport
    const renderUserList = () => {
        if (currentViewport === "mobile") {
            return (
                <div>
                    {users.map((user, index) => renderMobileUserCard(user, index))}
                </div>
            );
        } else if (currentViewport === "tablet") {
            return (
                <div>
                    {users.map((user, index) => renderTabletUserCard(user, index))}
                </div>
            );
        } else {
            return renderDesktopTableView();
        }
    };
    
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Tạo nhiều người dùng</CardTitle>
                <CardDescription>
                    Có thể thêm nhiều người dùng cùng lúc. Nếu có quan hệ cha-con, hãy nhập người dùng cha trước.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
                    </Alert>
                )}
                
                {success && (
                    <Alert variant="default" className="mb-4 bg-green-50 text-green-800 border-green-200">
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}
                
                <div className="space-y-6">
                    {renderUserList()}
                    
                    <Button 
                        variant="outline" 
                        onClick={handleAddUser}
                        className="w-full"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Thêm người dùng
                    </Button>
                </div>
            </CardContent>
            <CardFooter className={`flex ${isSmallScreen ? 'flex-col gap-3' : 'justify-between'}`}>
                <div>
                    <Badge variant="outline" className="mr-2">
                        {users.length} người dùng
                    </Badge>
                </div>
                <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className={isSmallScreen ? "w-full" : ""}
                >
                    {isSubmitting ? (
                        <>Đang xử lý...</>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" /> Tạo người dùng
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CreateUsers;