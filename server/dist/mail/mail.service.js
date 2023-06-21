"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("../utils/typeorm");
let MailService = class MailService {
    constructor(mailerService, contactRepository) {
        this.mailerService = mailerService;
        this.contactRepository = contactRepository;
    }
    async sendContact(contact) {
        await this.mailerService.sendMail({
            to: 'dunglm363@gmail.com',
            subject: contact.title,
            html: `<p>Topic: ${contact.topic}</p><p>Title: ${contact.title}</p><p>Email: ${contact.email}</p><p>Phone Number: ${contact.phone_number}</p><p>Address: ${contact.address}</p><p>Content: ${contact.content}</p>`,
        });
    }
    async sendReplyEmail(reply) {
        const contact = await this.contactRepository.findOne(reply.contact.contact_id);
        console.log(contact);
        await this.mailerService.sendMail({
            from: 'Phòng truyền thông....',
            to: contact.email,
            subject: 'Phản hồi',
            html: reply.content,
        });
        contact.status = 1;
        await this.contactRepository.save(contact);
        console.log(reply);
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_3.Contact)),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        typeorm_2.Repository])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map